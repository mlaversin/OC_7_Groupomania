import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function CommentForm({ post, handleRefresh }) {
  const { userInfo } = useContext(UserContext);

  const token = JSON.parse(localStorage.getItem('token'));

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .required('Veuillez entrer un commentaire')
      .min(10, 'Votre commentaire est trop court.')
      .max(500, 'Votre commentaire ne peut pas dépasser 500 caractères'),
  });

  const initialValues = {
    userId: userInfo.id,
    firstname: userInfo.firstname,
    lastname: userInfo.lastname,
    comment: '',
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = values => {
    fetch(`${process.env.REACT_APP_API_URL}/api/post/comment/${post._id}`, {
      method: 'put',
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
          setErrorMessage('');
          handleRefresh();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='form comment-form'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        <Form className='form comment-form'>
          <Field
            as='textarea'
            placeholder={`Ajouter un commentaire...`}
            id='comment'
            name='comment'
          />
          <div className='error-message'>
            <ErrorMessage name='message' />
          </div>
          <button className='btn btn-primary send-comment-btn' type='submit'>
            <FontAwesomeIcon icon={faPaperPlane} className='btn-icon' />
          </button>
          <div className='error-message'>
            {errorMessage ? errorMessage : ''}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
