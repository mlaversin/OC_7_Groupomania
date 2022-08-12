import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

/*
 * This component is the not found page which is displayed
 * in the event of a 404 error
 */
export default function NotFound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <>
      <Layout>
        <main className='notfound-page'>
          <h1>Oups, la page demandée n'existe pas !</h1>
          <button className='btn btn-primary' onClick={() => handleClick()}>
            Retour à l'accueil
          </button>
        </main>
      </Layout>
    </>
  );
}
