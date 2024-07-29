import React, { useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const handlEmoji = e => {
        setText((prev) => prev + e.emoji);
        setOpen(false)

    };
    console.log(text)

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Baburoa</span>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At reprehenderit porro molestiae minima, odit ipsam incidunt quasi nulla. Ipsa ea corporis in voluptatum soluta, incidunt eos cum labore sunt eaque!</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At reprehenderit porro molestiae minima, odit ipsam incidunt quasi nulla. Ipsa ea corporis in voluptatum soluta, incidunt eos cum labore sunt eaque!</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At reprehenderit porro molestiae minima, odit ipsam incidunt quasi nulla. Ipsa ea corporis in voluptatum soluta, incidunt eos cum labore sunt eaque!</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                   
                    <div className="texts">
                    <img src="./bg.jpg" alt="" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At reprehenderit porro molestiae minima, odit ipsam incidunt quasi nulla. Ipsa ea corporis in voluptatum soluta, incidunt eos cum labore sunt eaque!</p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" placeholder="Type a message..."

                    value={text}
                    onChange={e => setText(e.target.value)} />
                <div className="emoji">
                    <img
                        src="./emoji.png"
                        alt=""
                        onClick={() => setOpen((prev) => !prev)}
                    />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handlEmoji} />
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>
    );
};

export default Chat;
