import { useState } from 'react';
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

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (values) => {
    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', JSON.stringify(res.token));
          navigate('/');
        } else {
          navigate('/auth');
          setErrorMessage(res.message);
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/auth');
      });
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
          <div className='error-message'>
            {errorMessage ? errorMessage : ''}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
