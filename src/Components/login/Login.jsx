import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const [isRegister, setIsRegister] = useState(false);

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { email, username, password } = Object.fromEntries(formData);
        console.log(username);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        toast.success("Hello");
    };

    return (
        <div className="wrapper">
            <div className="tabs">
                {/* <button onClick={() => setIsRegister(false)}>Login</button>
                <button onClick={() => setIsRegister(true)}>Register</button> */}
            </div>
            {isRegister ? (
                <form onSubmit={handleRegister}>
                    <h1>Create Account</h1>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                        Upload an image
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <div className="input-box">
                        <input type="text" placeholder="User Name" name="username" required />
                        <box-icon type="solid" name="user" color="white"></box-icon>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Email" name="email" required />
                        <box-icon name="envelope" type="solid" color="white"></box-icon>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" name="password" required />
                        <box-icon name="lock-alt" type="solid" color="white"></box-icon>
                    </div>
                    <button type="submit" className="btn">Sign Up</button>
                    <p className="register-link">I have an account?<br /> <a href="#" onClick={() => setIsRegister(false)}>Login</a></p>
                    
                </form>
                
            ) : (
                <form onSubmit={handleLogin}>
                    <h1>Welcome Back</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" name="email" required />
                        <box-icon name="envelope" type="solid" color="white"></box-icon>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" name="password" required />
                        <box-icon name="lock-alt" type="solid" color="white"></box-icon>
                    </div>
                    <div className="remember-forget">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn">Sign in</button>
                    <p className="register-link">Don't have an account?<br /> <a href="#" onClick={() => setIsRegister(true)}>Register</a></p>
                </form>
            )}
            {/* <div className="register-link">
                <p>Don't have an account?<br /> <a href="#" onClick={() => setIsRegister(true)}>Register</a></p>
            </div> */}
        </div>
    );
};

export default Login;
