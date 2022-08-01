import Moment from 'moment';

export default function CommentCard({ comment }) {



  return (
    <div className='comment-card'>
      <div className='comment-card__header'>
        <p className='comment-card__username'>
          {comment.firstname + ' ' + comment.lastname}
        </p>
        <p className='comment-card__createdAt'>
          Posté le {Moment(comment.timestamp).format('DD/MM/YY à hh:mm')}
        </p>
      </div>
      <p className='comment-card__comment'>{comment.comment}</p>
    </div>
  );
}
