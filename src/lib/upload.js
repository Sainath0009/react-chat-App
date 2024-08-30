import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Assuming storage is already initialized in firebase.js

const upload = async (file) => {
    const date = new Date().getTime(); // Use timestamp to avoid name collisions
    const storageRef = ref(storage, `image/${date}_${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                reject("Something went wrong: " + error.code);
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        reject("Error getting download URL: " + error.message);
                    });
            }
        );
    });
}

export default upload;
