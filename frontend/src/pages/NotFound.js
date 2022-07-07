import React from 'react';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <>
      <Layout>
        <main className='notfound-page'>
          <h1>Erreur 404 - La page demandée n'existe pas !</h1>
        </main>
      </Layout>
    </>
  );
}
