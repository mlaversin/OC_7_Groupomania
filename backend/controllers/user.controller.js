const User = require('../models/User');
// const ObjectId = require('mongoose').Types.ObjectId;

/*
 * This function allows you to retrieve the information of all users
 */
exports.getAllUsers = (req, res) => {
  User.find()
    .select('-password')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/*
 * This function allows you to retrieve the information of a single user
 */
exports.getOneUser = (req, res) => {
  User.findOne({
    _id: req.params.id,
  })
    .select('-password')
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.statusMessage = "Cet utilisateur n'existe pas.";
      res.status(404).send();
    });
};

/*
 * This function allows you to update the information of a single user
 */
exports.updateUser = (req, res) => {
  User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      },
    }
  )
    .then(() =>
      res
        .status(200)
        .json({ message: 'Vos informations ont bien été mises à jour.' })
    )
    .catch((error) => res.status(400).json({ error }));
};

/*
 * This function is used to delete a user from the database
 */
exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: 'Votre compte a bien été supprimé.' })
    )
    .catch((error) => res.status(400).json({ error }));
};
