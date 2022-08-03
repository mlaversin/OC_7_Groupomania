import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import logo from '../../assets/logo-gpm.png';

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInfo(null);
    window.location.href = 'http://localhost:4200/auth';
  };

  return (
    <header className='header'>
      <div className='header-logo'>
        <img src={logo} alt='Groupomania' className='logo-gpm' />
      </div>
      {userInfo.role && (
        <button className='btn logout-btn' onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
}
