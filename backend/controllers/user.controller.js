const User = require('../models/User');

/*
 * This function allows you to retrieve the information of all users
 */
exports.getAllUsers = (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      if (req.auth.userRole === 'admin') {
        res.status(200).json(users);
      } else {
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à effectuer cette requête.",
        });
      }
    })
    .catch(error => {
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
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(404).json({ message: "Cet utilisateur n'existe pas." });
    });
};

/*
 * This function allows you to update the information of a single user
 */
exports.updateUser = (req, res) => {
  if (req.auth.userRole === 'admin' || req.auth.userId === req.params.id) {
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
      .catch(error => res.status(400).json({ error }));
  } else {
    res.status(403).json({
      message: "Vous n'êtes pas autorisé à effectuer cette requête.",
    });
  }
};

/*
 * This function is used to delete a user from the database
 */
exports.deleteUser = (req, res) => {
  if (req.auth.userRole === 'admin' || req.auth.userId === req.params.id) {
    User.deleteOne({ _id: req.params.id })
      .then(() =>
        res.status(200).json({ message: 'Votre compte a bien été supprimé.' })
      )
      .catch(error => res.status(400).json({ error }));
  } else {
    res.status(403).json({
      message: "Vous n'êtes pas autorisé à effectuer cette requête.",
    });
  }
};
