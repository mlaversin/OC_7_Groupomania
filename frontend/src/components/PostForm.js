import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function PostForm({ handleRefresh }) {
  const { userInfo } = useContext(UserContext);

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
    fetch(`${process.env.REACT_APP_API_URL}/api/post`, {
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
          handleRefresh();
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
              as='textarea'
              placeholder={`Quoi de neuf, ${userInfo.firstname} ?`}
              id='message'
              name='message'
            />
            <div className='error-message'>
              <ErrorMessage name='message' />
            </div>
          </div>
          <div>
            <button className='post-btn' type='submit'>
              Publier
            </button>
          </div>
          <div className='error-message'>
            {errorMessage ? errorMessage : ''}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
