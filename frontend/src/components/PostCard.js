import Moment from 'moment';

export default function PostCard({ post, userId }) {
  const createdAt = Moment(post.createdAt).format('DD/MM/YY à hh:mm');
  const updatedAt = Moment(post.updatedAt).format('DD/MM/YY à hh:mm');

  const isAuthenticated = userId === post.user._id ? true : false;
  const handleEdit = () => {};

  const handleDelete = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`http://localhost:3000/api/post/${post._id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  return (
    <article className='post-card'>
      <div className='post-card__header'>
        <p className='post-card__username'>
          {post.user.firstname + ' ' + post.user.lastname}
        </p>
        <p className='post-card__createdAt'>
          Posté le {createdAt}{' '}
          {createdAt !== updatedAt ? `- Modifié le ${updatedAt}` : ''}
        </p>
      </div>
      <div className='post-card__body'>
        <p className='post-card__message'>{post.message}</p>
      </div>
      <div className='post-card__footer'>
        {isAuthenticated && <button onClick={handleEdit}>Editer</button>}
        {isAuthenticated && <button onClick={handleDelete}>Supprimer</button>}
      </div>
    </article>
  );
}
