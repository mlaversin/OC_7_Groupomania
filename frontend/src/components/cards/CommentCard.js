import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Moment from 'moment';
import defaultProfilePic from '../../assets/default-profile-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteComment } from '../../actions/deleteComment';
import { editComment } from '../../actions/editComment';

/*
 * This component is the comment card. It displays the comment information and
 * the form used to edit comment
 */
export default function CommentCard({ post, comment, userId, handleRefresh }) {
  const { userInfo } = useContext(UserContext);

  const isAuthenticated = userId === comment.userId ? true : false;
  const isAdmin = userInfo.role === 'admin' ? true : false;
  const isAuthorized = isAuthenticated || isAdmin ? true : false;

  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(null);

  const handleEdit = commentId => {
    const data = { commentId: commentId, comment: newComment };
    editComment(data, post._id, handleRefresh);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteComment(post._id, comment._id, handleRefresh);
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
              onChange={e => setNewComment(e.target.value)}
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
