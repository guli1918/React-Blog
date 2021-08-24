import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './singlePost.css';
import { Context } from '../../context/Context';

export default function SinglePost() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const path = location.pathname.split('/')[2];

  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const publicFolder = 'http://localhost:5000/images/';

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async () => {
    setUpdateMode(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        <img className='singlePostImg' src={publicFolder + post.photo} alt='Blog-post' />
        {updateMode ? (
          <input
            className='singlePostTitleInput'
            type='text'
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        ) : (
          <h1 className='singlePostTitle'>
            {post.username === user.username && (
              <div className='singlePostEdit'>
                <i className='singlePostIcon far fa-edit' onClick={handleEdit}></i>
                <i className='singlePostIcon far fa-trash-alt' onClick={handleDelete}></i>
              </div>
            )}
            {title}
          </h1>
        )}
        <div className='singlePostInfo'>
          <span className='singlePostAuthor'>
            Author:{' '}
            <Link to={`/?user=${post.username}`} className='link'>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>{new Date(post.updatedAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className='singlePostDescriptionInput'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <div className='singlePostArea'>
            <p className='singlePostDescription'>{desc}</p>
          </div>
        )}
        {updateMode && (
          <button className='singlePostButton' onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
