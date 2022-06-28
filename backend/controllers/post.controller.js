const Post = require('../models/Post');
const { authUser } = require('../services/auth.services');
const { postUser } = require('../services/post.services');

/*
 * This function is used to create a post
 */
exports.createPost = async (req, res, next) => {
  const authenticatedUser = await authUser(req.auth.userId);
  const post = new Post({ ...req.body.post, userId: authenticatedUser.id });
  post
    .save()
    .then(() =>
      res.status(201).json({ message: 'Votre message a bien été envoyé.' })
    )
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/*
 * This function is used to retrieve all the posts
 */
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/*
 * This function is used to retrieve a single post
 */
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

/*
 * This function is used to update a post
 */
exports.editPost = async (req, res, next) => {
  const authenticatedUser = await authUser(req.auth.userId);
  const postUserId = await postUser(req.params.id);

  if (
    authenticatedUser.role === 'admin' ||
    authenticatedUser.id === postUserId
  ) {
    Post.updateOne(
      { _id: req.params.id },
      {
        $set: { message: req.body.post.message },
      }
    )
      .then(() =>
        res.status(200).json({ message: 'Le message a été modifié.' })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(403).json({
      message: "Vous n'êtes pas autorisé à effectuer cette requête.",
    });
  }
};

/*
 * This function is used to delete a post
 */
exports.deletePost = async (req, res, next) => {
  const authenticatedUser = await authUser(req.auth.userId);

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (
        authenticatedUser.role === 'admin' ||
        authenticatedUser.id === post.userId
      ) {
        Post.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: 'Votre message a été supprimé.' })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à effectuer cette requête.",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

/*
 * This function is used to add a like
 */
exports.likePost = (req, res, next) => {
  console.log('post liked !');
};
