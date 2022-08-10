export const validateMessageInput = (
  message,
  setFormIsValid,
  setErrorMessage
) => {
  setErrorMessage();
  if (message === undefined || message === null) {
    setErrorMessage('Veuillez entrer un message');
  } else if (message.length === 0) {
    setErrorMessage('Veuillez entrer un message.');
    setFormIsValid(false);
  } else if (message.length < 11) {
    setErrorMessage('Votre message est trop court (min. 10 caractères)');
    setFormIsValid(false);
  } else if (message.length > 500) {
    setErrorMessage.message(
      'Votre message est trop long (max. 500 caractères)'
    );
    setFormIsValid(false);
  } else {
    setFormIsValid(true);
  }
};

export const handleFileValidation = (
  file,
  setFormIsValid,
  setErrorFileUpload
) => {
  setErrorFileUpload();
  if (
    file.type !== 'image/jpeg' &&
    file.type !== 'image/jpg' &&
    file.type !== 'image/png' &&
    file.type !== 'image/gif'
  ) {
    setErrorFileUpload(
      'Type de fichier non pris en charge (uniquemment .jpeg, .jpg, .png et .gif).'
    );
    setFormIsValid(false);
  } else if (file.size > 500000) {
    setErrorFileUpload('Fichier image trop volumineux (max 500 Ko)');
    setFormIsValid(false);
  } else {
    setFormIsValid(true);
  }
};
