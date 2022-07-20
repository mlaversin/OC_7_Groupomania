import React from 'react';
import logo from '../assets/logo-gpm.png';

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:4200/auth';
  };

  return (
    <header className='header'>
      <div className='header-logo'>
        <img src={logo} alt='Groupomania' className='logo-gpm' />
      </div>
      <button className='btn logout-btn' onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}
