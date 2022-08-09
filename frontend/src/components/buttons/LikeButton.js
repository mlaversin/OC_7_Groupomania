import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { addLike } from '../../actions/addLike';
import { removeLike } from '../../actions/removeLike';

export default function LikeButton({ post, userId, handleRefresh }) {
  const [likedPost, setLikedPost] = useState(false);

  const handleAddLike = () => {
    if (post.user._id !== userId) {
      addLike(post._id, handleRefresh);
      setLikedPost(true);
    } else {
      console.log("Impossible d'évaluer vos posts.");
    }
  };

  const handleRemoveLike = () => {
    if (post.user._id !== userId) {
      removeLike(post._id, handleRefresh);
      setLikedPost(false);
    } else {
      console.log("Impossible d'évaluer vos posts.");
    }
  };

  useEffect(() => {
    if (post.usersLiked.includes(userId)) {
      setLikedPost(true);
    } else {
      setLikedPost(false);
    }
  }, [post.usersLiked, userId]);

  return (
    <div className='post-card__rating' tabIndex='0'>
      {likedPost === false && (
        <FontAwesomeIcon
          icon={faThumbsUp}
          className='like-btn-inactive'
          onClick={handleAddLike}
        />
      )}
      {likedPost && (
        <FontAwesomeIcon
          icon={faThumbsUp}
          className='like-btn-active'
          onClick={handleRemoveLike}
        />
      )}
      <div className='like-counter'>{post.likes}</div>
    </div>
  );
}
