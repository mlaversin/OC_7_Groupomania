const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
  .is().min(8, 'Le mot de passe doit contenir 8 caractères minimum.')
  .is().max(100, 'Le mot de passe doit contenir 100 caractères maximum.')
  .has().uppercase(1, 'Le mot de passe doit contenir au moins une lettre majuscule.')
  .has().lowercase(1, 'Le mot de passe doit contenir au moins une lettre minuscule.')
  .has().digits(1, 'Le mot de passe doit contenir au moins un chiffre.')
  .has().not().spaces(0, 'Les espaces ne sont pas autorisés')
  .is().not().oneOf(
    [
      'Passw0rd',
      'Pa55word',
      'Pa55w0rd',
      'Password123',
      'M0tdepasse',
      'Motdepass3',
      'Motd3passe',
      'M0tdepasse',
    ],
    'Mot de passe interdit.'
  ); // Blacklist these values

module.exports = (req, res, next) => {
  if (schema.validate(req.body.password)) {
    next();
  } else {
    const error = schema.validate(req.body.password, { details: true })[0].message;
    return res.status(400).json({ error });
  }
};

