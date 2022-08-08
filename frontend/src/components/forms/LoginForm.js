import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function LoginForm() {
  const { setUserInfo } = useContext(UserContext);
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

  const handleSubmit = values => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(res => {
        if (res.token) {
          localStorage.setItem('userId', JSON.stringify(res.userId));
          localStorage.setItem('firstname', JSON.stringify(res.firstname));
          localStorage.setItem('lastname', JSON.stringify(res.lastname));
          localStorage.setItem('token', JSON.stringify(res.token));
          setUserInfo({
            id: res.userId,
            firstname: res.firstname,
            lastname: res.lastname,
            role: res.role,
          });
          navigate('/');
        } else {
          setErrorMessage(res.error);
        }
      })
      .catch(err => {
        console.log('error');
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
      >
        <Form className='form login-form'>
          <label htmlFor='email'>Email</label>
          <Field type='email' id='email' name='email' />
          <div className='error-message'>
            <ErrorMessage name='email' />
          </div>

          <label htmlFor='password'>Mot de passe</label>
          <Field type='password' id='password' name='password' />
          <div className='error-message'>
            <ErrorMessage name='password' />
          </div>

          <button type='submit' className='btn btn-primary'>
            Connexion
          </button>

          <div className='error-message'>{errorMessage}</div>
        </Form>
      </Formik>
    </>
  );
}
