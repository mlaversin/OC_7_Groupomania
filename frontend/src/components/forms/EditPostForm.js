import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRotateLeft,
  faTrash,
  faImage,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

/*
 * This component is the comment edit form which is displayed
 * on PostCard component.
 */
export default function EditPostForm({
  post,
  message,
  setMessage,
  setFileUpload,
  setIsEditing,
  setDeleteFile,
  handleEdit,
}) {
  return (
    <>
      <div className='edit-post-form'>
        <textarea
          defaultValue={message}
          onChange={e => setMessage(e.target.value)}
        />
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
                onChange={e => setFileUpload(e.target.files[0])}
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
        <div className='edit-post-form-footer'>
          <button className='btn btn-black' onClick={() => setIsEditing(false)}>
            <FontAwesomeIcon icon={faArrowRotateLeft} className='btn-icon' />
            Annuler
          </button>
          <button
            className='btn btn-primary'
            onClick={() => handleEdit(post._id)}
          >
            <FontAwesomeIcon icon={faPaperPlane} className='btn-icon' />
            Publier
          </button>
        </div>
      </div>
    </>
  );
}
