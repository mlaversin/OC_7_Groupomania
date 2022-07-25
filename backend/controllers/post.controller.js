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
  Post.findOne({ _id: req.params.id })
    .then(post => {
      if (
        req.auth.userRole === 'admin' ||
        req.auth.userId === post.user.toString()
      ) {
        Post.updateOne(
          { _id: req.params.id },
          { $set: { message: req.body.message } }
        )
          .then(() =>
            res.status(200).json({ message: 'Votre message a été modifié.' })
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
exports.likePost = (req, res) => {
  const like = req.body.like;
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const noRating = !post.usersLiked.includes(req.auth.userId);

      if (noRating && like === 1) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $push: { usersLiked: req.auth.userId },
            $inc: { likes: +1 },
          }
        )
          .then(() => res.status(200).json({ message: 'like ajouté !' }))
          .catch(error => res.status(400).json({ error }));
      } else if (like === 0) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $pull: { usersLiked: req.auth.userId },
            $inc: { likes: -1 },
          }
        )
          .then(() => res.status(200).json({ message: 'like annulé !' }))
          .catch(error => res.status(400).json({ error }));
      } else {
        res.status(400).json({ message: 'Problème avec la requête.' });
      }
    })
    .catch(error => res.status(400).json({ error }));
};
