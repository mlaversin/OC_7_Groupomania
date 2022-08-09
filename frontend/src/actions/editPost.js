/*
 * This function allows the update of a post in the database
 */
export const editPost = (
  postId,
  message,
  fileUpload,
  deleteFile,
  handleRefresh
) => {
  const formData = new FormData();
  formData.append('message', message);
  formData.append('image', fileUpload || '');
  formData.append('deleteFile', deleteFile);

  const token = JSON.parse(localStorage.getItem('token'));

  fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, {
    method: 'put',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then(res => res.json())
    .then(res => {
      handleRefresh();
      console.log(res.message);
    });
};
