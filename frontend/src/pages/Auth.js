import React from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

export default function Auth() {
  return (
    <>
      <main className='authentication-page'>
        <h1>Page d'authentification</h1>
        <LoginForm />
        <SignUpForm />
      </main>
    </>
  );
}
