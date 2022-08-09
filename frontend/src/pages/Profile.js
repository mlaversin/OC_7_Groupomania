import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import defaultProfilePic from '../assets/default-profile-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const [isEditingPic, setIsEditingPic] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [deleteFile, setDeleteFile] = useState(false);

  const handleEditPic = id => {
    const formData = new FormData();
    formData.append('image', fileUpload || '');
    formData.append('deleteFile', deleteFile);

    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`${process.env.REACT_APP_API_URL}/api/user/${id}/picture`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        handleRefresh();
        console.log(res.message);
      })
      .catch();
    setIsEditingPic(false);
    setDeleteFile(false);
    setFileUpload(null);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));

    fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          navigate('/auth');
        } else {
          return res.json();
        }
      })
      .then(data => {
        setUser(data);
      })
      .catch(err => console.log(err));
  }, [navigate]);

  const handleRefresh = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));

    fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          navigate('/auth');
        } else {
          return res.json();
        }
      })
      .then(data => {
        setUser(data);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Layout>
        <main className='profile-page'>
          <h1>Mon profil utilisateur</h1>
          <div className='picture-container'>
            <div className='field-title'>Ma photo de profil</div>
            <div className='profile-pic-container'>
              {user && user.pictureUrl ? (
                <img
                  src={user.pictureUrl}
                  className='profile-pic'
                  alt='utilisateur'
                />
              ) : (
                <img
                  src={defaultProfilePic}
                  className='profile-pic'
                  alt='utilisateur'
                />
              )}
            </div>
            <div className='edit-pic-container'>
              {isEditingPic === false && (
                <button
                  className='btn btn-primary edit-pic-btn'
                  onClick={() => setIsEditingPic(true)}
                >
                  Editer
                </button>
              )}
              {isEditingPic && (
                <>
                  <div className='handle-img-btn'>
                    <label htmlFor='image' className='btn change-img-btn'>
                      <FontAwesomeIcon icon={faImage} className='btn-icon' />
                      Choisir une image
                      <input
                        type='file'
                        id='image'
                        name='image'
                        accept='image/jpg, image/jpeg, image/png, image/gif'
                        onChange={e => {
                          setFileUpload(e.target.files[0]);
                        }}
                      />
                    </label>
                    {user.pictureUrl && (
                      <button
                        className='btn delete-img-btn'
                        onClick={() => setDeleteFile(true)}
                      >
                        <FontAwesomeIcon icon={faTrash} className='btn-icon' />
                        Supprimer l'image
                      </button>
                    )}
                  </div>

                  <div>
                    <button
                      className='btn btn-black'
                      onClick={() => setIsEditingPic(false)}
                    >
                      Annuler
                    </button>
                    <button
                      className='btn btn-primary'
                      onClick={() => handleEditPic(user._id)}
                    >
                      Valider
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='info-container'>
            <div className='field-container'>
              <div className='field-title'>Mon addresse email</div>
              <div className='field-content'>{user ? user.email : ''}</div>
            </div>
            <div className='field-container'>
              <div className='field-title'>Mon prénom</div>
              <div className='field-content'>{user ? user.firstname : ''}</div>
            </div>
            <div className='field-container'>
              <div className='field-title'>Mon nom</div>
              <div className='field-content'>{user ? user.lastname : ''}</div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
