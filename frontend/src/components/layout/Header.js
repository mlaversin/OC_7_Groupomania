import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/logo-gpm.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
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
        {userName === null && (
          <>
            <nav className='header-nav'>
              <ul>
                <li>Se connecter</li>
                <li>S'inscrire</li>
              </ul>
            </nav>
          </>
        )}
        {userName && (
          <nav className='header-nav'>
            <ul>
              <li>
                <a href='/' className='btn'>
                  <FontAwesomeIcon icon={faMessage} className='btn-icon' />
                  Accueil
                </a>
              </li>
              <li>
                <a href='/profil' className='btn btn-black'>
                  <FontAwesomeIcon icon={faUser} className='btn-icon' />
                  {userName}
                </a>
              </li>
              <li onClick={handleLogout}>
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
