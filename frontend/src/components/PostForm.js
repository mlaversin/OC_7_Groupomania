import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function PostForm({ handleRefresh }) {
  const { userInfo } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('token'));

  const [message, setMessage] = useState();
  const [fileUpload, setFileUpload] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const handleMessage = e => {
    setMessage(e.target.value);
  };

  const handleUpload = e => {
    setFileUpload(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('image', fileUpload || '');

    fetch(`${process.env.REACT_APP_API_URL}/api/post`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          const error = res.error.errors['message'].message;
          setErrorMessage(error);
        } else {
          console.log(res.message);
          setErrorMessage('');
          handleRefresh();
        }
      })
      .catch(err => {
        console.log(err);
      });
    setMessage(null);
    setFileUpload(null);
  };

  return (
    <div className='form post-form'>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
          e.target.reset();
          setFileUpload(null);
        }}
      >
        <div>
          <textarea
            placeholder={`Quoi de neuf, ${userInfo.firstname} ?`}
            id='message'
            name='message'
            onChange={e => handleMessage(e)}
          />
        </div>
        <div>
          <input
            type='file'
            id='file'
            name='file'
            accept='image/jpg, image/jpeg, image/png, image/gif'
            onChange={e => handleUpload(e)}
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
