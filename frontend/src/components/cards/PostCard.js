import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { editPost } from '../../actions/editPost';
import { deletePost } from '../../actions/deletePost';
import LikeButton from '../buttons/LikeButton';
import CommentCard from './CommentCard';
import CommentForm from '../forms/CommentForm';
import defaultProfilePic from '../../assets/default-profile-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateLeft,
  faPenToSquare,
  faTrash,
  faImage,
  faMessage,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';

/*
 * This component is the post card. It displays the post information,
 * the form to send a comment and all comments (CommentCard).
 */
export default function PostCard({ post, userId, handleRefresh }) {
  const { userInfo } = useContext(UserContext);

  const isAuthenticated = userId === post.user._id ? true : false;
  const isAdmin = userInfo.role === 'admin' ? true : false;
  const isAuthorized = isAuthenticated || isAdmin ? true : false;

  const [isEditing, setIsEditing] = useState(false);

  const [message, setMessage] = useState(post.message);
  const [fileUpload, setFileUpload] = useState();
  const [deleteFile, setDeleteFile] = useState(false);

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  const handleEdit = postId => {
    editPost(postId, message, fileUpload, deleteFile, handleRefresh);
    setIsEditing(false);
    setDeleteFile(false);
    setFileUpload(null);
  };

  const handleDelete = postId => {
    deletePost(postId, handleRefresh);
  };

  return (
    <article className='post-card'>
      <div className='post-card__header'>
        <div className='post-card__header__author'>
          <div className='post-card__header__author__picture'>
            {post.user.pictureUrl ? (
              <img src={post.user.pictureUrl} alt='' />
            ) : (
              <img src={defaultProfilePic} alt='' />
            )}
          </div>
          <p className='post-card__header__author__name'>
            {post.user.firstname + ' ' + post.user.lastname}
          </p>
        </div>
        <p className='post-card__header__createdAt'>
          Posté le {Moment(post.createdAt).format('DD/MM/YY à hh:mm')}
        </p>
      </div>
      <div className='post-card__body'>
        {isEditing === false && (
          <>
            <p className='post-card__body__message'>{post.message}</p>
            <div className='post-card__body__image'>
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
          <div className='edit-post-form'>
            <textarea
              defaultValue={message}
              onChange={e => setMessage(e.target.value)}
            />
            <div className='edit-post-form-img'>
              <div className='btn add-img-btn'>
                <label htmlFor='image'>
                  <FontAwesomeIcon icon={faImage} className='btn-icon' />
                  Choisir une image
                  <input
                    type='file'
                    id='image'
                    name='image'
                    accept='image/jpg, image/jpeg, image/png, image/gif'
                    onChange={e => setFileUpload(e.target.files[0])}
                  />
                </label>
              </div>
              {post.imageUrl && (
                <>
                  <button
                    className='btn delete-img-btn'
                    onClick={() => setDeleteFile(true)}
                  >
                    <FontAwesomeIcon icon={faTrash} className='btn-icon' />
                    Supprimer l'image
                  </button>
                </>
              )}
            </div>
            <div className='edit-post-form-footer'>
              <button
                className='btn btn-black'
                onClick={() => setIsEditing(false)}
              >
                <FontAwesomeIcon
                  icon={faArrowRotateLeft}
                  className='btn-icon'
                />
                Annuler
              </button>
              <button
                className='btn btn-primary'
                onClick={() => handleEdit(post._id)}
              >
                <FontAwesomeIcon icon={faPaperPlane} className='btn-icon' />
                Publier
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='post-card__footer'>
        <LikeButton post={post} userId={userId} handleRefresh={handleRefresh} />
        <div
          className='toggle-comments'
          onClick={() => setShowComments(!showComments)}
        >
          <div className='post-card__comment'>
            <FontAwesomeIcon icon={faMessage} />
            <div className='comment-counter'>{comments.length}</div>
          </div>
        </div>

        {isAuthorized && isEditing === false && (
          <div className='edit-delete-buttons'>
            <div>
              <button onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faPenToSquare} className='btn-icon' />
              </button>
              <button
                className='delete-btn'
                onClick={() => handleDelete(post._id)}
              >
                <FontAwesomeIcon icon={faTrash} className='btn-icon' />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='comments'>
        <CommentForm post={post} handleRefresh={handleRefresh} />
        {showComments && (
          <div className='comments-container'>
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
        )}
      </div>
    </article>
  );
}
