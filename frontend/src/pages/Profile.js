import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import defaultProfilePic from '../assets/default-profile-picture.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

/*
 * This component is the profile page. It displays the user's photo
 * and information and allows the user to edit them
 */
export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPic, setIsEditingPic] = useState(false);
  const [fileUpload, setFileUpload] = useState();
  const [deleteFile, setDeleteFile] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Ce champs est requis.'),
    lastname: Yup.string().required('Ce champs est requis.'),
  });

  const initialValues = {
    firstname: '',
    lastname: '',
  };

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

  const handleSubmit = values => {
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = JSON.parse(localStorage.getItem('userId'));

    fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.message);
        handleRefresh();
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
                  <FontAwesomeIcon icon={faImage} className='btn-icon' />
                  Editer l'image
                </button>
              )}
              {isEditingPic && (
                <>
                  <div className='handle-img-btn'>
                    <label htmlFor='image' className='btn change-img-btn'>
                      <FontAwesomeIcon icon={faImage} className='btn-icon' />
                      Sélectionner un fichier
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
            {isEditing === false && (
              <>
                <div className='field-container'>
                  <div className='field-title'>Mon prénom</div>
                  <div className='field-content'>
                    {user ? user.firstname : ''}
                  </div>
                </div>
                <div className='field-container'>
                  <div className='field-title'>Mon nom</div>
                  <div className='field-content'>
                    {user ? user.lastname : ''}
                  </div>
                </div>
                <div className='field-container'>
                  <button
                    className='btn btn-primary edit-info-btn'
                    onClick={() => setIsEditing(true)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='btn-icon'
                    />
                    Corriger les infos
                  </button>
                </div>
              </>
            )}
            {isEditing && (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                  handleSubmit(values);
                  setIsEditing(false);
                }}
              >
                <Form className='form edit-infos-form'>
                  <div className='field-container'>
                    <label htmlFor='firstname'>Mon prénom</label>
                    <Field type='firstname' id='firstname' name='firstname' />
                    <div className='error-message'>
                      <ErrorMessage name='firstname' />
                    </div>
                  </div>
                  <div className='field-container'>
                    <label htmlFor='lastname'>Mon nom</label>
                    <Field type='lastname' id='lastname' name='lastname' />
                    <div className='error-message'>
                      <ErrorMessage name='lastname' />
                    </div>
                  </div>
                  <div className='field-container-btn'>
                    <button
                      className='btn btn-black'
                      onClick={() => setIsEditing(false)}
                    >
                      Annuler
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Valider
                    </button>
                  </div>
                </Form>
              </Formik>
            )}
            <div className='info-container-buttons'></div>
          </div>
        </main>
      </Layout>
    </>
  );
}
