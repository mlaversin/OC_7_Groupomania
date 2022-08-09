/*
 * This function allows to add a comment
 */
export const addComment = (postId, values, setErrorMessage, handleRefresh) => {
  const token = JSON.parse(localStorage.getItem('token'));
  fetch(`${process.env.REACT_APP_API_URL}/api/post/comment/${postId}`, {
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
