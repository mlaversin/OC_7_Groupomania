import React from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

export default function Auth() {
  return (
    <div>
      <h1>Page d'autentification</h1>
      <LoginForm />
      <SignUpForm />
    </div>
  );
}
