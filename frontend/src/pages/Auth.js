import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignUpForm';

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
        <div className='auth-container'>
          <div className='auth-container__header'>
            <ul>
              <li
                id='login'
                className={`login-tab ${loginForm ? 'active' : null}`}
                onClick={handleForms}
              >
                Se connecter
              </li>
              <li
                id='signup'
                className={`signup-tab ${signUpForm ? 'active' : null}`}
                onClick={handleForms}
              >
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
