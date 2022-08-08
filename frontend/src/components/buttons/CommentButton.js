import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export default function CommentButton({ commentsNumber }) {
  return (
    <div className='post-card__comment'>
      <FontAwesomeIcon icon={faMessage} />
      <div className='comment-counter'>{commentsNumber}</div>
    </div>
  );
}
