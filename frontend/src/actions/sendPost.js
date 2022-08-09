/*
 * This function manages the sending of posts to the DB
 */
export const sendPost = (
  message,
  setMessage,
  fileUpload,
  setFileUpload,
  setErrorMessage,
  handleRefresh
) => {
  const formData = new FormData();
  formData.append('message', message);
  formData.append('image', fileUpload || '');

  const token = JSON.parse(localStorage.getItem('token'));

  fetch(`${process.env.REACT_APP_API_URL}/api/post`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
  setMessage(null);
  setFileUpload(null);
};
