import React, { useState } from 'react';
import Moment from 'moment';

export default function PostCard({ post }) {
  const token = JSON.parse(localStorage.getItem('token'));

  const [user, setUser] = useState();
  const createdAt = Moment(post.createdAt).format('DD/MM/YY à hh:mm');

  fetch(`http://localhost:3000/api/user/${post.user}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      setUser(data.firstname + ' ' + data.lastname);
    });

  return (
    <article className='post-card'>
      <p className='post-card__username'>{user}</p>
      <p className='post-card__createdAt'>Posté le {createdAt} </p>
      <p className='post-card__message'>{post.message}</p>
    </article>
  );
}
