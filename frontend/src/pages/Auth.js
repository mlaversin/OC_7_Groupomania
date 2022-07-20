import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

export default function Auth() {
  const [loginForm, setLoginForm] = useState(true);
  const [signUpForm, setSignUpForm] = useState(false);

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
        <h1>Page d'authentification</h1>
        <div className='auth-container'>
          <div className='auth-container__header'>
            <ul>
              <li id='login' onClick={handleForms}>
                Se connecter
              </li>
              <li id='signup' onClick={handleForms}>
                S'inscrire
              </li>
            </ul>
          </div>
          <div className='auth-container__body'>
            {loginForm && <LoginForm />}
            {signUpForm && <SignUpForm />}
          </div>
        </div>
      </main>
    </>
  );
}
