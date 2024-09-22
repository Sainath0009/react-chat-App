import "./addUser.css";
import { db } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
  
    try {
      const newChatRef = doc(collection(db, "chats"));
  
      // Create a new chat document with server timestamp and empty messages
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
  
      // Check if the user chat document exists, if not create it
      const userChatDocRef = doc(db, "userchats", user.id);
      const currentUserChatDocRef = doc(db, "userchats", currentUser.id);
  
      const userChatSnap = await getDoc(userChatDocRef);
      const currentUserChatSnap = await getDoc(currentUserChatDocRef);
  
      // If the user's chat document doesn't exist, create it
      if (!userChatSnap.exists()) {
        await setDoc(userChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser.id,
            updatedAt: Date.now(),
          }),
        });
      } else {
        await updateDoc(userChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: currentUser.id,
            updatedAt: Date.now(),
          }),
        });
      }
  
      // If the current user's chat document doesn't exist, create it
      if (!currentUserChatSnap.exists()) {
        await setDoc(currentUserChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Date.now(),
          }),
        });
      } else {
        await updateDoc(currentUserChatDocRef, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: "",
            receiverId: user.id,
            updatedAt: Date.now(),
          }),
        });
      }
  
      console.log("Chat created with ID: ", newChatRef.id);
    } catch (err) {
      console.log("Error adding user:", err);
    }
  };
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;