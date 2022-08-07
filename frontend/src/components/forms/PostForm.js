import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { sendPost } from '../../actions/sendPost';

export default function PostForm({ handleRefresh }) {
  const { userInfo } = useContext(UserContext);

  const [message, setMessage] = useState();
  const [fileUpload, setFileUpload] = useState();

  const [formIsValid, setFormIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [errorFileUpload, setErrorFileUpload] = useState();

  const handleMessageValidation = () => {
    setFormIsValid(true);
    setErrorMessage();
    if (message === undefined) {
      setErrorMessage('Veuillez entrer un message.');
      setFormIsValid(false);
    } else if (message.length < 11) {
      setErrorMessage('Votre message est trop court (min. 10 caractères)');
      setFormIsValid(false);
    } else if (message.length > 500) {
      setErrorMessage.message(
        'Votre message est trop long (max. 500 caractères)'
      );
      setFormIsValid(false);
    }
  };

  const handleFileValidation = file => {
    setErrorFileUpload();
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/gif'
    ) {
      setErrorFileUpload(
        'Type de fichier non pris en charge (uniquemment .jpeg, .jpg, .png et .gif).'
      );
      setFormIsValid(false);
    }
    if (file.size > 500000) {
      setErrorFileUpload('Fichier image trop volumineux (max 500 Ko)');
      setFormIsValid(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formIsValid) {
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
    } else {
      console.log(errorMessage);
    }
  };

  return (
    <div className='form post-form'>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <div>
          <textarea
            placeholder={`Quoi de neuf, ${userInfo.firstname} ?`}
            id='message'
            name='message'
            onChange={e => setMessage(e.target.value)}
            onBlur={() => handleMessageValidation()}
          />
          <div className='error-message'>{errorMessage}</div>
        </div>
        <div>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/jpg, image/jpeg, image/png, image/gif'
            onChange={e => {
              setFileUpload(e.target.files[0]);
              handleFileValidation(e.target.files[0]);
            }}
          />
          <div className='error-message'>{errorFileUpload}</div>
        </div>
        <div>
          <button className='post-btn' type='submit'>
            Publier
          </button>
        </div>
      </form>
    </div>
  );
}
