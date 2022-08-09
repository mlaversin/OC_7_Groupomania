import React from 'react';

/*
 * This component is the not found page which is displayed
 * in the event of a 404 error
 */
export default function NotFound() {
  return (
    <>
      <main className='notfound-page'>
        <h1>Erreur 404 - La page demandée n'existe pas !</h1>
      </main>
    </>
  );
}
