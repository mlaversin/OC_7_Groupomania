import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

export default function CommentButton({commentsNumber}) {
  return (
    <div className='post-card__comment'>
      <FontAwesomeIcon icon={faComment} />
      <div className='comment-counter'>{commentsNumber}</div>
    </div>
  );
}
