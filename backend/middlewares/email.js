const validator = require('validator');

module.exports = (req, res, next) => {
  const { email } = req.body;

  if (validator.isEmail(email)) {
    next();
  } else {
    res.statusMessage = 'Email invalide.';
    return res.status(400).send();
  }
};
