import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function LikeButton({ post, userId }) {
  const [likedPost, setLikedPost] = useState(false);

  const addLike = () => {
    if (post.user._id !== userId) {
      const token = JSON.parse(localStorage.getItem('token'));
      const rate = { like: 1 };
      fetch(`http://localhost:3000/api/post/${post._id}/like`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rate),
      })
        .then(res => res.json())
        .then(res => console.log(res.message));
      setLikedPost(true);
    } else {
      console.log("Impossible d'évaluer vos posts.");
    }
  };

  const removeLike = () => {
    if (post.user._id !== userId) {
      const token = JSON.parse(localStorage.getItem('token'));
      const rate = { like: 0 };
      fetch(`http://localhost:3000/api/post/${post._id}/like`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rate),
      })
        .then(res => res.json())
        .then(res => console.log(res.message));
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
    <div className='post-card__rating'>
      {likedPost === false && (
        <FontAwesomeIcon
          icon={faThumbsUp}
          className='like-btn-inactive'
          onClick={addLike}
        />
      )}
      {likedPost && (
        <FontAwesomeIcon
          icon={faThumbsUp}
          className='like-btn-active'
          onClick={removeLike}
        />
      )}
      <div className='like-counter'>{post.likes}</div>
    </div>
  );
}
