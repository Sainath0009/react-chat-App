import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  // Fetch and listen to chat updates
  useEffect(() => {
    if (!currentUser?.id) return;

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const chatItems = res.data()?.chats || [];

      const chatDataPromises = chatItems.map(async (chatItem) => {
        const userDocRef = doc(db, "users", chatItem.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.exists() ? userDocSnap.data() : null;

        return { ...chatItem, user };
      });

      const chatData = await Promise.all(chatDataPromises);

      // Sort chats by updatedAt timestamp (latest first)
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub(); // Cleanup the listener on component unmount
    };
  }, [currentUser?.id]);

  // Handle chat selection
  const handleSelect = async (chat) => {
    const updatedChats = chats.map((chatItem) => {
      const { user, ...rest } = chatItem;
      return rest;
    });

    const chatIndex = updatedChats.findIndex((item) => item.chatId === chat.chatId);
    if (chatIndex >= 0) {
      updatedChats[chatIndex].isSeen = true;

      const userChatsRef = doc(db, "userchats", currentUser.id);

      try {
        await updateDoc(userChatsRef, { chats: updatedChats });
        changeChat(chat.chatId, chat.user);
      } catch (error) {
        console.error("Error updating chat:", error);
      }
    }
  };

  // Filter chats based on search input
  const filteredChats = chats.filter((chat) =>
    chat.user?.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chatList">
      {/* Search bar */}
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="Search Icon" />
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {/* Toggle add user mode */}
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="Add/Remove Icon"
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {/* Render filtered chats */}
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}
        >
          <img
            src={
              chat.user?.blocked?.includes(currentUser.id)
                ? "./avatar.png"
                : chat.user?.avatar || "./avatar.png"
            }
            alt="User Avatar"
          />
          <div className="texts">
            <span>
              {chat.user?.blocked?.includes(currentUser.id)
                ? "User"
                : chat.user?.username || "Unknown"}
            </span>
            <p>{chat.lastMessage || "No message"}</p>
          </div>
        </div>
      ))}

      {/* Add User Mode */}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
