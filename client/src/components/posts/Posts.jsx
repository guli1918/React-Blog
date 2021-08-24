import Post from "../post/post"
import "./posts.css"

export default function posts(props) {
    return (
        <div className="posts">
            {props.posts.map((p) => (
                <Post key={p._id}  posts={p} />
            ))}
        </div>
    )
}
