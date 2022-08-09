import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { addComment } from '../../actions/addComment';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

/*
 * This component is the comment form which is displayed
 * on PostCard component.
 */
export default function CommentForm({ post, handleRefresh }) {
  const { userInfo } = useContext(UserContext);

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
    addComment(post._id, values, setErrorMessage, handleRefresh);
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
