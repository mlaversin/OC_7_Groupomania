/*
 * This function allows to delete a post in the database
 */
export const deletePost = (postId, handleRefresh) => {
  const token = JSON.parse(localStorage.getItem('token'));
  fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      handleRefresh();
      console.log(res.message);
    });
};
