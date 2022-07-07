import React from 'react';
import logo from '../assets/logo-gpm.png';

export default function Header() {
  return (
    <header className='header'>
      <div className='header-logo'>
        <img src={logo} alt='Groupomania' className='logo-gpm' />
      </div>
    </header>
  );
}
