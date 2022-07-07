import React from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import Layout from '../components/Layout';

export default function Auth() {
  return (
    <>
      <Layout>
        <main className='authentication-page'>
          <h1>Page d'authentification</h1>
          <LoginForm />
          <SignUpForm />
        </main>
      </Layout>
    </>
  );
}
