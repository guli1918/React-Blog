import { Link } from "react-router-dom"
import "./post.css"

export default function post(props) {
    const publicFolder = "http://localhost:5000/images/"
    return (
        <div className="post">
            {props.posts.photo && (
                <img className="postImg" src={publicFolder + props.posts.photo} alt="Blog-Post" />
            )}
            <div className="postInfo">
                <div className="postCats">{
                    props.posts.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                <Link className="link" to={`/post/${props.posts._id}`}>
                <span className="postTitle">
                    {props.posts.title}
                </span>
                </Link>
                <hr />
                <span className="postDate">{new Date(props.posts.createdAt).toDateString()}</span>
            </div>
            <p className="postDescription">{props.posts.desc}</p>
        </div>
    )
}
