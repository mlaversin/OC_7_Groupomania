/*
 * This function allows to update a comment in the database
 */
export const editComment = (data, postId, handleRefresh) => {
  const token = JSON.parse(localStorage.getItem('token'));

  fetch(`${process.env.REACT_APP_API_URL}/api/post/comment/${postId}/edit`, {
    method: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => {
      handleRefresh();
      console.log(res.message);
    });
};
