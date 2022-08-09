/*
 * This function allows the like a post
 */
export const addLike = (postId, handleRefresh, setLikedPost) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const rate = { like: 1 };
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
    });
};
