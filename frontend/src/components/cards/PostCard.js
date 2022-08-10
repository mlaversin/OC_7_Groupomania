import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import EditPostForm from '../forms/EditPostForm';
import CommentCard from './CommentCard';
import { deletePost } from '../../actions/deletePost';
import CommentForm from '../forms/CommentForm';
import LikeButton from '../buttons/LikeButton';
import defaultProfilePic from '../../assets/default-profile-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrash,
  faMessage,
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

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

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
          <EditPostForm
            post={post}
            message={message}
            setMessage={setMessage}
            setIsEditing={setIsEditing}
            handleRefresh={handleRefresh}
          />
        )}
      </div>
      <div className='post-card__footer'>
        <LikeButton post={post} userId={userId} handleRefresh={handleRefresh} />
        <div
          className='toggle-comments'
          onClick={() => setShowComments(!showComments)}
        >
          <div className='post-card__comment' tabIndex='0'>
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
