import { useState } from "react"
import "./chatList.css"
import AddUser from "./addUser/addUser";
const ChatList = () => {
  const [addMode, setAddMode] = useState(false)
  return (
    <div className='chatlist'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img src={addMode ? "./minus.png" : "./plus.png"} alt="" className="add"
          onClick={() => setAddMode(prev => !prev)} />
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Baburao</span>
          <p>helo</p>
        </div>
      </div>

      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Baburao</span>
          <p>helo</p>
        </div>
      </div>

      
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Baburao</span>
          <p>helo</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Baburao</span>
          <p>helo</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Baburao</span>
          <p>helo</p>
        </div>
      </div>
      {addMode &&   <AddUser/>}
    </div>
  );
};

export default ChatList