import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function PostForm() {
  const token = JSON.parse(localStorage.getItem('token'));

  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .required('Veuillez entrer un message')
      .min(10, 'Votre message est trop court.')
      .max(500, 'Votre message ne peut pas dépasser 500 caractères'),
  });

  const initialValues = {
    message: '',
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = values => {
    fetch('http://localhost:3000/api/post', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          const error = res.error.errors['message'].message;
          setErrorMessage(error);
        } else {
          console.log(res.message);
          setErrorMessage('');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='form post-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        <Form>
          <div>
            {/* <label htmlFor='message'>Votre message</label> */}
            <Field
              type='text'
              placeholder='Quoi de neuf ?'
              id='message'
              name='message'
            />
            <div className='error-message'>
              <ErrorMessage name='message' />
            </div>
          </div>
          <div>
            <button type='submit'>Publier</button>
          </div>
          <div className='error-message'>
            {errorMessage ? errorMessage : ''}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
