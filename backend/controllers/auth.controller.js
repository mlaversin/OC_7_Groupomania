const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
// const ObjectId = require('mongoose').Types.ObjectId;

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

/*
 * This function allows the user to sign up
 */
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      user
        .save()
        .then(() =>
          res
            .status(201)
            .json({ message: 'Le nouveau compte a bien été créé.' })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*
 * This function allows the user to login
 */
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.statusMessage = "Ce compte n'existe pas.";
        return res.status(401).send();
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.statusMessage = 'Mot de passe invalide.';
            return res.status(401).send();
          }
          const token = createToken(user._id);
          res.cookie('jwt', token, { httpOnly: true, maxAge });
          res.status(200).json({ userId: user._id });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*
 * This function allows the user to logout
 */
exports.logout = (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
