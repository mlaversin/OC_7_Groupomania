import { useState } from 'react';
import Moment from 'moment';
import LikeButton from './LikeButton';

export default function PostCard({ post, userId }) {
  const createdAt = Moment(post.createdAt).format('DD/MM/YY à hh:mm');

  const isAuthenticated = userId === post.user._id ? true : false;

  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const handleEdit = id => {
    const token = JSON.parse(localStorage.getItem('token'));
    const post = { message: editPost };
    fetch(`http://localhost:3000/api/post/${id}`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then(res => res.json())
      .then(res => console.log(res.message));
    setIsEditing(false);
  };

  const handleDelete = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(`http://localhost:3000/api/post/${post._id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => console.log(res.message));
  };

  return (
    <article className='post-card'>
      <div className='post-card__header'>
        <p className='post-card__username'>
          {post.user.firstname + ' ' + post.user.lastname}
        </p>
        <p className='post-card__createdAt'>
          Posté le {createdAt}
        </p>
      </div>
      <div className='post-card__body'>
        {isEditing === false && (
          <p className='post-card__message'>{post.message}</p>
        )}
        {isEditing && (
          <div className='updatePost'>
            <textarea
              defaultValue={post.message}
              onChange={e => setEditPost(e.target.value)}
            />
            <button onClick={() => handleEdit(post._id)}>Valider</button>
            <button onClick={() => setIsEditing(false)}>Annuler</button>
          </div>
        )}
      </div>
      <div className='post-card__footer'>
        <LikeButton post={post} userId={userId} />
        {isAuthenticated && (
          <div className='buttons'>
            <button onClick={() => setIsEditing(true)}>Editer</button>
            <button className='delete-btn' onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
