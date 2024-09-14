import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Assuming storage is already initialized in firebase.js

const upload = async (file) => {
    const date = new Date().getTime(); // Timestamp to avoid name collisions
    const storageRef = ref(storage, `images/${date}_${file.name}`); // Path for the uploaded file in Firebase Storage

    // Start the file upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                reject(`Something went wrong: ${error.code}`);
            },
            () => {
                // Get the download URL upon successful upload completion
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL); // Resolve the promise with the download URL
                    })
                    .catch((error) => {
                        reject(`Error getting download URL: ${error.message}`);
                    });
            }
        );
    });
};

export default upload;
