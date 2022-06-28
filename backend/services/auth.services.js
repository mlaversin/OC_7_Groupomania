const User = require('../models/User');

exports.authUser = (id) => {
  return User.findOne({ _id: id })
    .select('role')
    .select('email')
    .then((user) => user)
    .catch((error) => console.log(error));
};
