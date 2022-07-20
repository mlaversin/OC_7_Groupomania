import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function SignUpForm() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Le prénom est obligatoire'),
    lastname: Yup.string().required('Le prénom est obligatoire'),
    email: Yup.string()
      .email('Email invalide')
      .required("L'email est obligatoire"),
    password: Yup.string().required('Le mot de passe est obligatoire'),
  });

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };

  const handleSubmit = values => {
    fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.message);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='form signup-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
      >
        <Form>
          <div>
            <label htmlFor='firstname'>Prénom</label>
            <Field type='firstname' id='firstname' name='firstname' />
            <div className='error-message'>
              <ErrorMessage name='firstname' />
            </div>
          </div>
          <div>
            <label htmlFor='lastname'>Nom</label>
            <Field type='lastname' id='lastname' name='lastname' />
            <div className='error-message'>
              <ErrorMessage name='lastname' />
            </div>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <Field type='email' id='email' name='email' />
            <div className='error-message'>
              <ErrorMessage name='email' />
            </div>
          </div>
          <div>
            <label htmlFor='password'>Mot de passe</label>
            <Field type='password' id='password' name='password' />
            <div className='error-message'>
              <ErrorMessage name='password' />
            </div>
          </div>
          <div>
            <button type='submit'>Inscription</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
