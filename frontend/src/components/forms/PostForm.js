import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { sendPost } from '../../actions/sendPost';

export default function PostForm({ handleRefresh }) {
  const { userInfo } = useContext(UserContext);

  const [message, setMessage] = useState();
  const [fileUpload, setFileUpload] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    sendPost(
      message,
      setMessage,
      fileUpload,
      setFileUpload,
      setErrorMessage,
      handleRefresh
    );
    e.target.reset();
    setFileUpload(null);
  };

  return (
    <div className='form post-form'>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <textarea
            placeholder={`Quoi de neuf, ${userInfo.firstname} ?`}
            id='message'
            name='message'
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <div>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/jpg, image/jpeg, image/png, image/gif'
            onChange={e => setFileUpload(e.target.files[0])}
          />
        </div>
        <div>
          <button className='post-btn' type='submit'>
            Publier
          </button>
        </div>
        <div className='error-message'>{errorMessage ? errorMessage : ''}</div>
      </form>
    </div>
  );
}
