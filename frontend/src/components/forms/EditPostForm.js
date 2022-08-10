import { useState } from 'react';
import { editPost } from '../../actions/editPost';
import {
  validateMessageInput,
  handleFileValidation,
} from '../../services/FormValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateLeft,
  faTrash,
  faImage,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

/*
 * This component is the post edit form which is displayed
 * on PostCard component.
 */
export default function EditPostForm({
  post,
  message,
  setMessage,
  setIsEditing,
  handleRefresh,
}) {
  const [fileUpload, setFileUpload] = useState();
  const [deleteFile, setDeleteFile] = useState(false);

  const [formIsValid, setFormIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [errorFileUpload, setErrorFileUpload] = useState();

  const handleSubmit = postId => {
    if (message === undefined || message === null) {
      setErrorMessage('Veuillez entrer un message');
    } else if (formIsValid && message !== undefined) {
      editPost(postId, message, fileUpload, deleteFile, handleRefresh);
      setIsEditing(false);
      setDeleteFile(false);
      setFileUpload(null);
    } else {
      console.log(errorMessage);
      console.log(errorFileUpload);
    }
  };

  return (
    <>
      <div className='edit-post-form'>
        <textarea
          defaultValue={message}
          onChange={e => setMessage(e.target.value)}
          onBlur={() =>
            validateMessageInput(message, setFormIsValid, setErrorMessage)
          }
        />
        <div className='error-message'>{errorMessage}</div>
        <div className='edit-post-form-img'>
          <div className='btn add-img-btn'>
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
                  handleFileValidation(
                    e.target.files[0],
                    setFormIsValid,
                    setErrorFileUpload
                  );
                }}
              />
            </label>
          </div>
          {post.imageUrl && (
            <>
              <button
                className='btn delete-img-btn'
                onClick={() => setDeleteFile(true)}
              >
                <FontAwesomeIcon icon={faTrash} className='btn-icon' />
                Supprimer l'image
              </button>
            </>
          )}
        </div>
        <div className='error-message'>{errorFileUpload}</div>
        <div className='edit-post-form-footer'>
          <button className='btn btn-black' onClick={() => setIsEditing(false)}>
            <FontAwesomeIcon icon={faArrowRotateLeft} className='btn-icon' />
            Annuler
          </button>
          <button
            className='btn btn-primary'
            onClick={() => handleSubmit(post._id)}
          >
            <FontAwesomeIcon icon={faPaperPlane} className='btn-icon' />
            Publier
          </button>
        </div>
      </div>
    </>
  );
}
