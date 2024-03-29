import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';
import Footer from '../components/layout/Footer';
import logo from '../assets/logo-gpm.png';

/*
 * This component is the authentication page.
 * It contains the login form and the registration form.
 */
export default function Auth() {
  const [loginForm, setLoginForm] = useState(true);
  const [signUpForm, setSignUpForm] = useState(false);
  const [register, setRegister] = useState(false);

  const handleForms = e => {
    if (e.target.id === 'signup') {
      setSignUpForm(true);
      setLoginForm(false);
    } else {
      setSignUpForm(false);
      setLoginForm(true);
    }
  };

  return (
    <>
      <main className='authentication-page'>
        <header className='auth-header'>
          <div className='auth-header-container'>
            <div className='header-logo'>
              <a href='/auth'>
                <img
                  src={logo}
                  alt='Accueil Groupomania'
                  className='auth-logo-gpm'
                />
              </a>
            </div>
            <nav className='auth-header-nav'>
              <ul>
                <li
                  id='login'
                  className={`login-tab ${loginForm ? 'active' : null}`}
                  tabIndex='0'
                  onClick={handleForms}
                >
                  Se connecter
                </li>
                <li
                  id='signup'
                  className={`signup-tab ${signUpForm ? 'active' : null}`}
                  tabIndex='0'
                  onClick={handleForms}
                >
                  S'inscrire
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {register && (
          <div className='success-message'>
            <p>Votre compte a été créé. Merci de vous connecter.</p>
            <button className='btn' onClick={() => setRegister(false)}>
              x
            </button>
          </div>
        )}
        <div className='auth-modal'>
          <div className='auth-modal-container'>
            {loginForm && <LoginForm />}
            {signUpForm && (
              <SignUpForm
                setRegister={setRegister}
                setSignUpForm={setSignUpForm}
                setLoginForm={setLoginForm}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
