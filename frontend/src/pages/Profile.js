import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfilePic from '../assets/default-profile-picture.png';

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
      .then(res => console.log(res.message))
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

  return (
    <>
      <main className='profile-page'>
        <h1>Mon profil utilisateur</h1>
        <div className='field-container'>
          <div className='picture-container'>
            <div className='field-title'>Ma photo de profil</div>
            {isEditingPic === false && (
              <>
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

                <button onClick={() => setIsEditingPic(true)}>Editer</button>
              </>
            )}
            {isEditingPic && (
              <>
                <input
                  type='file'
                  accept='image/jpg, image/jpeg, image/png'
                  onChange={e => setFileUpload(e.target.files[0])}
                />
                {user.pictureUrl && (
                  <button onClick={() => setDeleteFile(true)}>
                    Supprimer l'image
                  </button>
                )}

                <button onClick={() => handleEditPic(user._id)}>Valider</button>
                <button onClick={() => setIsEditingPic(false)}>Annuler</button>
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
    </>
  );
}
