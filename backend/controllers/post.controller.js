const Post = require('../models/Post');
const fs = require('fs');
/*
 * This function is used to create a post
 */
exports.createPost = (req, res) => {
  if (req.file) {
    const post = new Post({
      ...req.body,
      user: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
      }`,
    });
    post
      .save()
      .then(() =>
        res.status(201).json({ message: 'Votre message a bien été envoyé.' })
      )
      .catch(error => {
        // delete the image if message sending is not successful
        if (req.file) {
          const filename = post.imageUrl.split('/uploads/')[1];
          fs.unlink(`uploads/${filename}`, error => {
            if (error) console.error('ignored', error.message);
          });
        }
        res.status(400).json({ error });
      });
  } else {
    const post = new Post({ ...req.body, user: req.auth.userId });
    post
      .save()
      .then(() =>
        res.status(201).json({ message: 'Votre message a bien été envoyé.' })
      )
      .catch(error => {
        res.status(400).json({ error });
      });
  }
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
        req.auth.userRole !== 'admin' &&
        req.auth.userId !== post.user.toString()
      ) {
        res.status(403).json({
          message: "Vous n'êtes pas autorisé à effectuer cette requête.",
        });
      } else {
        // the user wants to delete the old image without adding a new one
        if (post.imageUrl && req.body.deleteFile === 'true' && !req.file) {
          const filename = post.imageUrl.split('/uploads/')[1];
          fs.unlink(`uploads/${filename}`, error => {
            if (error) console.error('ignored', error.message);
          });
          post.message = req.body.message;
          post.imageUrl = undefined;
          post.save();
        }
        // the user sends an image
        if (req.file) {
          // delete the old image if it exists
          if (post.imageUrl) {
            const filename = post.imageUrl.split('/uploads/')[1];
            fs.unlink(`uploads/${filename}`, error => {
              if (error) console.error('ignored', error.message);
            });
          }
          Post.updateOne(
            { _id: req.params.id },
            {
              $set: {
                message: req.body.message,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${
                  req.file.filename
                }`,
              },
            }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: 'Votre message a été mis à jour.' })
            )
            .catch(error => res.status(400).json({ error }));
        } else {
          // the user edits a message without an image
          Post.updateOne(
            { _id: req.params.id },
            { $set: { message: req.body.message } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: 'Votre message a été mis à jour.' })
            )
            .catch(error => res.status(400).json({ error }));
        }
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
          .then(() => {
            if (post.imageUrl) {
              const filename = post.imageUrl.split('/uploads/')[1];
              fs.unlink(`uploads/${filename}`, error => {
                if (error) console.error('ignored', error.message);
              });
            }
            res.status(200).json({ message: 'Votre message a été supprimé.' });
          })
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
 * This function is used to add/remove a like
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

/*
 * This function is used to add a comment
 */
exports.createComment = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            userId: req.body.userId,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            comment: req.body.comment,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then(() => res.status(201).json({ message: 'commentaire ajouté !' }))
      .catch(error => res.status(500).json({ error }));
  } catch (error) {
    return res.status(400).json({ error });
  }
};

/*
 * This function is used to edit a comment
 */
exports.editComment = (req, res) => {
  try {
    return Post.findById(req.params.id, (err, docs) => {
      const comment = docs.comments.find(comment =>
        comment._id.equals(req.body.commentId)
      );

      if (!comment)
        return res.status(400).json({ message: 'Commentaire inconnu' });
      comment.comment = req.body.comment;

      return docs.save(err => {
        if (!err)
          return res.status(200).json({ message: 'Commentaire modifié' });
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

/*
 * This function is used to delete a comment
 */
exports.deleteComment = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
      .catch(error => res.status(500).json({ error }));
  } catch (error) {
    return res.status(400).json({ error });
  }
};
