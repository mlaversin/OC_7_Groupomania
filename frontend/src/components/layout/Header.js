import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/logo-gpm.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  const userName = JSON.parse(localStorage.getItem('firstname'));
  const { setUserInfo } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(null);
    window.location.href = '/auth';
  };

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='header-logo'>
          <a href='/'>
            <img src={logo} alt='Accueil Groupomania' className='logo-gpm' />
          </a>
        </div>
        {userName && (
          <nav className='header-nav'>
            <ul>
              <li
                onClick={() => navigate('/')}
                className={`btn-icon ${pathname === '/' ? 'active' : null}`}
                tabIndex='0'
              >
                <FontAwesomeIcon icon={faMessage} className='btn-icon' />
                Messages
              </li>
              <li
                onClick={() => navigate('/profil')}
                className={`btn-icon ${
                  pathname === '/profil' ? 'active' : null
                }`}
                tabIndex='0'
              >
                <FontAwesomeIcon icon={faUser} className='btn-icon' />
                {userName}
              </li>
              <li onClick={() => handleLogout()}>
                <a href='/auth' className='btn'>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className='btn-icon'
                  />
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
