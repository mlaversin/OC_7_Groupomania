import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Moment from 'moment';
import defaultProfilePic from '../../assets/default-profile-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
        console.log(res.message);
        handleRefresh();
      });
  };

  return (
    <div className='comment-card'>
      <div className='comment-card__header'>
        <div className='comment-card__author'>
          <div className='comment-card__picture'>
            <img src={defaultProfilePic} alt='' />
          </div>
          <p className='comment-card__username'>
            {comment.firstname + ' ' + comment.lastname}
          </p>
        </div>
        <p className='comment-card__createdAt'>
          Posté le {Moment(comment.timestamp).format('DD/MM/YY à hh:mm')}
        </p>
      </div>
      <div className='comment-card__body'>
        {isEditing === false && (
          <p className='comment-card__comment'>{comment.comment}</p>
        )}
        {isEditing && (
          <div className='edit-comment-form'>
            <textarea
              defaultValue={comment.comment}
              onChange={e => setEditComment(e.target.value)}
            />
            <div className='edit-comment-form-buttons'>
              <button
                className='btn btn-black'
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
              <button
                className='btn btn-primary'
                onClick={() => handleEdit(comment._id)}
              >
                Valider
              </button>
            </div>
          </div>
        )}
        <div className='edit-delete-buttons'>
          {isAuthorized && isEditing === false && (
            <div>
              <button onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faPenToSquare} className='btn-icon' />
              </button>
              <button className='delete-btn' onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash} className='btn-icon' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
