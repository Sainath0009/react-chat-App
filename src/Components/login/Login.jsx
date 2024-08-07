import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";




const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleRegister = e => {

        e.preventDefault()
     const formData =new FormData(e.target  )
     const {email,username,password}=Object.fromEntries(formData);
        console.log(username);
    };
    const handleLogin = e => {

        e.preventDefault()
        toast.success("Hello")
    }
    
    return (
        <div className="login">
            <div className="item">
                <h1>Welcome Back</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button>Sign in</button>
                </form>
            </div>
            <div className="seprate"></div>
            <div className="item">
                <h1>Create Account</h1>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload an image
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" placeholder="User Name" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
