/*
 * This function allows to remove a like from a post
 */
export const removeLike = (postId, handleRefresh) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const rate = { like: 0 };
  fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}/like`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rate),
  })
    .then(res => res.json())
    .then(res => {
      handleRefresh();
      console.log(res.message);
    });
};
