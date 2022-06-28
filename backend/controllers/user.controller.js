const User = require('../models/User');
const { authUser } = require('../services/auth.services');

/*
 * This function allows you to retrieve the information of all users
 */
exports.getAllUsers = async (req, res) => {
  const authenticatedUser = await authUser(req.auth.userId);

  User.find()
    .select('-password')
    .then((users) => {
      if (authenticatedUser.role === 'admin') {
        res.status(200).json(users);
      } else {
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à effectuer cette requête.",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/*
 * This function allows you to retrieve the information of a single user
 */
exports.getOneUser = async (req, res) => {
  const authenticatedUser = await authUser(req.auth.userId);

  User.findOne({
    _id: req.params.id,
  })
    .select('-password')
    .then((user) => {
      if (
        authenticatedUser.role === 'admin' ||
        authenticatedUser.email === user.email
      ) {
        res.status(200).json(user);
      } else {
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à effectuer cette requête.",
        });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: "Cet utilisateur n'existe pas." });
    });
};

/*
 * This function allows you to update the information of a single user
 */
exports.updateUser = async (req, res) => {
  const authenticatedUser = await authUser(req.auth.userId);

  if (authenticatedUser === 'admin' || authenticatedUser.id === req.params.id) {
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
  } else {
    res.status(403).json({
      message: "Vous n'êtes pas autorisé à effectuer cette requête.",
    });
  }
};

/*
 * This function is used to delete a user from the database
 */
exports.deleteUser = async (req, res, next) => {
  const authenticatedUser = await authUser(req.auth.userId);

  if (authenticatedUser === 'admin' || authenticatedUser.id === req.params.id) {
    User.deleteOne({ _id: req.params.id })
      .then(() =>
        res.status(200).json({ message: 'Votre compte a bien été supprimé.' })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(403).json({
      message: "Vous n'êtes pas autorisé à effectuer cette requête.",
    });
  }
};
