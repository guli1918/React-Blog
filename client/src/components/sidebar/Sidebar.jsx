import { useState, useEffect } from 'react'
import axios from 'axios'
import "./sidebar.css"
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const [cats, setCat] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories")
            setCat(res.data)
        }
        getCats();
    }, [])


    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className="" src="https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="programmer" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis id, error exercitationem delectus nisi iure!</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((cat) => (
                        <Link key={cat._id} className="link" to={`/?cat=${cat.name}`}><li className="sidebarListItem">{cat.name}</li></Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                </div>
            </div>
        </div>
    )
}
