import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import Moment from 'moment';

export default function CommentCard({ post, comment, userId, handleRefresh }) {
  const { userInfo } = useContext(UserContext);

  const isAuthenticated = userId === comment.userId ? true : false;
  const isAdmin = userInfo.role === 'admin' ? true : false;
  const isAuthorized = isAuthenticated || isAdmin ? true : false;

  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(null);

  const handleEdit = id => {
    const token = JSON.parse(localStorage.getItem('token'));
    const data = { commentId: id, comment: editComment };
    console.log(data);
    fetch(
      `${process.env.REACT_APP_API_URL}/api/post/comment/${post._id}/edit`,
      {
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
      .then(res => res.json())
      .then(res => {
        handleRefresh();
        console.log(res.message);
      });
    setIsEditing(false);
  };

  const handleDelete = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    fetch(
      `${process.env.REACT_APP_API_URL}/api/post/comment/${post._id}/delete`,
      {
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId: comment._id }),
      }
    )
      .then(res => res.json())
      .then(res => {
        handleRefresh();
      });
  };

  return (
    <div className='comment-card'>
      <div className='comment-card__header'>
        <p className='comment-card__username'>
          {comment.firstname + ' ' + comment.lastname}
        </p>
        <p className='comment-card__createdAt'>
          Posté le {Moment(comment.timestamp).format('DD/MM/YY à hh:mm')}
        </p>
      </div>
      <div className='comment-card-body'>
        {isEditing === false && (
            <p className='comment-card__comment'>{comment.comment}</p>
        )}
        {isEditing && (
          <div>
            <textarea
              defaultValue={comment.comment}
              onChange={e => setEditComment(e.target.value)}
            />
            <button onClick={() => handleEdit(comment._id)}>Valider</button>
            <button onClick={() => setIsEditing(false)}>Annuler</button>
          </div>
        )}
      </div>
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
  );
}
