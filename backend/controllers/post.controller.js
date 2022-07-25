const Post = require('../models/Post');
const User = require('../models/User');

/*
 * This function is used to create a post
 */
exports.createPost = (req, res) => {
  const post = new Post({ ...req.body, user: req.auth.userId });
  post
    .save()
    .then(() =>
      res.status(201).json({ message: 'Votre message a bien été envoyé.' })
    )
    .catch(error => {
      console.log('on est dans le catch de createPost');
      res.status(400).json({ error });
    });
};

/*
 * This function is used to retrieve all the posts
 */
exports.getAllPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: 'desc' })
    .populate('user', 'firstname + lastname')
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};

/*
 * This function is used to retrieve a single post
 */
exports.getOnePost = (req, res) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(404).json({ error });
    });
};

/*
 * This function is used to update a post
 */
exports.editPost = async (req, res) => {
  const postUserId = await Post.findOne({ _id: req.params.id })
    .then(post => post.userId)
    .catch(error => res.status(400).json({ error }));

  if (
    req.auth.userRole === 'admin' ||
    req.auth.userId === post.user.toString()
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
      .catch(error => res.status(400).json({ error }));
  } else {
    res.status(403).json({
      message: "Vous n'êtes pas autorisé à effectuer cette requête.",
    });
  }
};

/*
 * This function is used to delete a post
 */
exports.deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (
        req.auth.userRole === 'admin' ||
        req.auth.userId === post.user.toString()
      ) {
        Post.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: 'Votre message a été supprimé.' })
          )
          .catch(error => res.status(400).json({ error }));
      } else {
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à effectuer cette requête.",
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

/*
 * This function is used to add a like
 */
exports.likePost = (req, res, next) => {
  console.log('post liked !');
};
