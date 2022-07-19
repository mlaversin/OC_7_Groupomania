import Moment from 'moment';

export default function PostCard({ post }) {
  const createdAt = Moment(post.createdAt).format('DD/MM/YY à hh:mm');

  return (
    <article className='post-card'>
      <p className='post-card__username'>
        {post.user.firstname + ' ' + post.user.lastname}
      </p>
      <p className='post-card__createdAt'>Posté le {createdAt} </p>
      <p className='post-card__message'>{post.message}</p>
    </article>
  );
}
