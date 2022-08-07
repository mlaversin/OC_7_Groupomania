import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profilPic from '../assets/profile-pic.png';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

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
  });

  return (
    <>
      <main className='profile-page'>
        <h1>Mon profil utilisateur</h1>
        <div className='field-container'>
          <div className='picture-container'>
            <div className='field-title'>Ma photo de profil</div>
            <img src={profilPic} alt='utilisateur' />
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
