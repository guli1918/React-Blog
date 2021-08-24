import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import "./login.css"

export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    return (
        <div className="login">
            <h1 className="loginTitle">
                Login
            </h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input ref={userRef} className="loginInput" type="text" placeholder="Enter your username.." />
                <label>Password</label>
                <input ref={passwordRef} className="loginInput" type="password" placeholder="Enter your password.." />
                <button type="submit" className="loginButtons" disabled={isFetching}>Login</button>
            </form>
                <Link className="link linkButton" to="/register">Register</Link>
        </div>
    )
}
