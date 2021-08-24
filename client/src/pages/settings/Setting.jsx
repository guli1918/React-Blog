import { useContext, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Setting() {

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const publicFolder = "http://localhost:5000/images/";

    const { user, dispatch } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const DATE = Date.now();

        const profilePic = DATE + file.name;

        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
            profilePic
        };
        if (file) {
            const data = new FormData();
            const filename = DATE + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.photo = filename;
            updatedUser.file = 'Almaz';
            console.log(filename)
            try {
                await axios.post("/upload", data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (error) {
            console.log(error)
            dispatch({ type: "UPDATE_FAILURE" });
        }
    }

    console.log(user)
    console.log(user.profilePic)
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Your Account</span>
                </div>
                <form className="settingsForm" autoComplete="off" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : publicFolder + user.profilePic} alt="profilepic" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" className="PPAddButton" onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
                    <label>Password</label>
                    <input type="password" placeholder="********" autoComplete="new-password" onChange={e => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <span className="successUpdate">Profile has been updated!</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
