import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Moment from 'moment';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

export default function PostCard({ post, userId, handleRefresh }) {
  const { userInfo } = useContext(UserContext);

  const isAuthenticated = userId === post.user._id ? true : false;
  const isAdmin = userInfo.role === 'admin' ? true : false;
  const isAuthorized = isAuthenticated || isAdmin ? true : false;

  const [isEditing, setIsEditing] = useState(false);

  const [message, setMessage] = useState(post.message);
  const [fileUpload, setFileUpload] = useState();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  const handleEdit = id => {
    const token = JSON.parse(localStorage.getItem('token'));

    const formData = new FormData();
    formData.append('message', message );
    formData.append('image', fileUpload || '');

    fetch(`${process.env.REACT_APP_API_URL}/api/post/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        handleRefresh();
        console.log(res.message);
      });
    setIsEditing(false);
  };

  const handleDelete = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(`${process.env.REACT_APP_API_URL}/api/post/${post._id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        handleRefresh();
        console.log(res.message);
      });
  };

  return (
    <article className='post-card'>
      <div className='post-card__header'>
        <p className='post-card__username'>
          {post.user.firstname + ' ' + post.user.lastname}
        </p>
        <p className='post-card__createdAt'>
          Posté le {Moment(post.createdAt).format('DD/MM/YY à hh:mm')}
        </p>
      </div>
      <div className='post-card__body'>
        {isEditing === false && (
          <>
            <p className='post-card__message'>{post.message}</p>
            <div className='post-card__image'>
              {post.imageUrl ? (
                <img
                  className='post-card__image'
                  src={post.imageUrl}
                  alt='post'
                />
              ) : (
                ''
              )}
            </div>
          </>
        )}
        {isEditing && (
          <div>
            <textarea
              defaultValue={message}
              onChange={e => setMessage(e.target.value)}
            />
            <input
              type='file'
              onChange={e => setFileUpload(e.target.files[0])}
            />
            <button onClick={() => handleEdit(post._id)}>Valider</button>
            <button onClick={() => setIsEditing(false)}>Annuler</button>
          </div>
        )}
      </div>
      <div className='post-card__footer'>
        <LikeButton post={post} userId={userId} handleRefresh={handleRefresh} />
        <CommentButton commentsNumber={comments.length} />
        <div className='edit-delete-buttons'>
          {isAuthorized && (
            <div>
              <button onClick={() => setIsEditing(true)}>Editer</button>
              <button className='delete-btn' onClick={handleDelete}>
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='comments'>
        <CommentForm post={post} handleRefresh={handleRefresh} />
        {comments.map(comment => (
          <CommentCard
            key={comment._id}
            comment={comment}
            userId={userId}
            post={post}
            handleRefresh={handleRefresh}
          />
        ))}
      </div>
    </article>
  );
}
