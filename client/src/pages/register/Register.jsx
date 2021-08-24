import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./register.css";

export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [submiting, setSubmiting] =  useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        if (submiting) return;

        setSubmiting(true);
        setError(false);
        try {
            const res = await axios.post("/auth/register", {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }
        setSubmiting(false);
    }

    return (
        <div className="login">
            <h1 className="loginTitle">
                Register
            </h1>
            <form className="loginForm" autoComplete="off" onSubmit={handleSubmit}>
                <label>Email</label>
                <input className="loginInput" type="email" placeholder="Enter your email.." onChange={e => setEmail(e.target.value)}/>
                <label>Username</label>
                <input className="loginInput" type="text" placeholder="Enter your username.." onChange={e => setUsername(e.target.value)} />
                <label>Password</label>
                <input className="loginInput" type="password" placeholder="Enter your password.." autoComplete="new-password" onChange={e => setPassword(e.target.value)} />
                <button type="submit" className="loginButton" disabled={submiting}>Register</button>
            </form>
            <button className="registerButton">
                <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span className="error">Something is wrong!</span>}
        </div>
    )
}
