const Post = require('../models/Post');

exports.postUser = (id) => {
  return Post.findOne({ _id: id })
    .then((post) => post.userId)
    .catch((error) => console.log(error));
};
