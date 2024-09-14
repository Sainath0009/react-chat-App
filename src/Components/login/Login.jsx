import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({ file: null, url: "" });
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.target);
    const { email, username, password } = Object.fromEntries(formData.entries());
  
    try {
     
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      //
      const imgurl = avatar.file ? await upload(avatar.file) : null;
  

      await setDoc(doc(db, "users", res.user.uid), {
        username:username,
        email,
        avatar: imgurl,  // Store avatar URL if available
        id: res.user.uid,
        blocked: []
      });
      await setDoc(doc(db, "userchat", res.user.uid), {
       chats:[],
      });
      toast.success("Account created successfully! You can now login.");
    } catch (err) {
      console.error("Error creating account:", err);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid login credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      {isRegister ? (
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="Avatar" />
            Upload an image
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
          <div className="input-box">
            <input type="text" placeholder="User Name" name="username" required />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" name="email" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="password" required />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <p className="register-link">Already have an account? <a onClick={() => setIsRegister(false)}>Login</a></p>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <h1>Welcome Back</h1>
          <div className="input-box">
            <input type="email" placeholder="Email" name="email" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="password" required />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
          <p className="register-link">Don't have an account? <a onClick={() => setIsRegister(true)}>Register</a></p>
        </form>
      )}
    </div>
  );
};

export default Login;
