import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { sendPost } from '../../actions/sendPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
    <form className='form post-form' onSubmit={e => handleSubmit(e)}>
      <div className='post-form__body'>
        <textarea
          placeholder={`Quoi de neuf, ${userInfo.firstname} ?`}
          id='message'
          name='message'
          onChange={e => setMessage(e.target.value)}
          onBlur={() => handleMessageValidation()}
        />
        <div className='error-message'>{errorMessage}</div>
      </div>
      <div className='post-form__footer'>
        <div className='image-buttons'>
          <div className='btn add-image-btn'>
            <label htmlFor='image'>
              <FontAwesomeIcon icon={faImage} className='btn-icon' />
              Choisir une image
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
            </label>
          </div>
        </div>
        <div className='send-btn'>
          <button className='btn btn-primary' type='submit'>
            <FontAwesomeIcon icon={faPaperPlane} className='btn-icon' />
            Publier
          </button>
        </div>
      </div>
      <div className='error-message'>{errorFileUpload}</div>
    </form>
  );
}
