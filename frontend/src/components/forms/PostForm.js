import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { sendPost } from '../../actions/sendPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {
  validateMessageInput,
  handleFileValidation,
} from '../../services/FormValidation';

/*
 * This component is the form that manages the sending of posts
 * after the validation of the fields. The handleRefresh function allows
 * to refresh the display of pots in the homepage.
 */
export default function PostForm({ handleRefresh }) {
  const { userInfo } = useContext(UserContext);

  const [message, setMessage] = useState();
  const [fileUpload, setFileUpload] = useState();

  const [formIsValid, setFormIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [errorFileUpload, setErrorFileUpload] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    if (message === undefined || message === null) {
      setErrorMessage('Veuillez entrer un message');
    } else if (formIsValid && message !== undefined) {
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
      console.log(errorFileUpload);
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
          onBlur={() =>
            validateMessageInput(message, setFormIsValid, setErrorMessage)
          }
        />
        <div className='error-message'>{errorMessage}</div>
      </div>
      <div className='post-form__footer'>
        <div className='image-buttons'>
          <div className='btn add-image-btn'>
            <label htmlFor='changeImageInput' tabIndex='0'>
              <FontAwesomeIcon icon={faImage} className='btn-icon' />
              Choisir une image
            </label>
            <input
              type='file'
              id='changeImageInput'
              name='image'
              accept='image/jpg, image/jpeg, image/png, image/gif'
              onChange={e => {
                setFileUpload(e.target.files[0]);
                handleFileValidation(
                  e.target.files[0],
                  setFormIsValid,
                  setErrorFileUpload
                );
              }}
            />
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
