import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function LoginForm() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email invalide')
      .required("L'email est obligatoire"),
    password: Yup.string().required('Le mot de passe est obligatoire'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values) => {
    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((userInfo) => {
        localStorage.setItem('token', JSON.stringify(userInfo.token));
        console.log('login');
        console.log(userInfo.token);
        // navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='form login-form'>
      <h2 className='form-title'>Formulaire de connexion</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
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
            <button type='submit'>Connexion</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
