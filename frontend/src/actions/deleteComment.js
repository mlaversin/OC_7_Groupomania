/*
 * This function allows to delete a comment in the database
 */
export const deleteComment = (postId, commentId, handleRefresh) => {
  const token = JSON.parse(localStorage.getItem('token'));
  fetch(`${process.env.REACT_APP_API_URL}/api/post/comment/${postId}/delete`, {
    method: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commentId: commentId }),
  })
    .then(res => res.json())
    .then(res => {
      console.log(res.message);
      handleRefresh();
    });
};
