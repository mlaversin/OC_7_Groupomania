import React from 'react';

export default function PostCard(props) {
  console.log(props.post);
  return (
    <article className='post-card'>
      <p className='message'>{props.post.message}</p>
    </article>
  );
}
