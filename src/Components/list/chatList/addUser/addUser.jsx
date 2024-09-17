import "./addUser.css";
import { db } from "../../../../lib/firebase";
import { arrayUnion, collection, doc,getDocs, query, serverTimestamp, setDoc,updateDoc, where, } from "firebase/firestore";
import { useState } from "react";
import {useUserStore} from "../../../../lib/userStore";


const AddUser = () => {
  const [user, setUser] = useState(null);
  const[currentUser]=useUserStore();

  // Make the function async
  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        console.log("No such user found");
        setUser(null);
      }
    } catch (err) {
      console.log("Error fetching user:", err);
    }
  };
const handleAdd= async()=>{

  const chatRef= collection(db,"chats")
  const userChatsRef= collection(db,"userchats")
try {

  const newChatRef = doc(collection(db, "chats"));

    await setDoc(chatRef,{
    createdAt:serverTimestamp,
    messages:[],      
  });


  await updateDoc(doc(userChatsRef, user.id),{
    chats:arrayUnion({
      chatId:newChatRef.id,
      lastMessage:"",
      reciverId:currentUser.id,
      updatedAt:Date.now(),
    })
  });
  await updateDoc(doc(userChatsRef, currentUser.id),{
    chats:arrayUnion({
      chatId:newChatRef.id,
      lastMessage:"",
      reciverId:user.id,
      updatedAt:Date.now(),
    })
  });
  
} catch (err) {
  console.log("Error adding user:", err);
  
}

}
  return (
    <div className="adduser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button type="submit">Search</button>
      </form>

      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="User Avatar" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add user</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;