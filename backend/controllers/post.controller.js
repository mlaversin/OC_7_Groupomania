const Post = require('../models/Post');

/*
 * This function is used to create a post
 */
exports.createPost = (req, res, next) => {
  console.log('sauce created');
};

/*
 * This function is used to retrieve all the posts
 */
exports.getAllPosts = (req, res, next) => {
  console.log('all the posts !');
};

/*
 * This function is used to retrieve a single post
 */
exports.getOnePost = (req, res, next) => {
  console.log('the post !');
};

/*
 * This function is used to update a post
 */
exports.editPost = (req, res, next) => {
  console.log('post updated !');
};

/*
 * This function is used to delete a post
 */
exports.deletePost = (req, res, next) => {
  console.log('post deleted !');
};

/*
 * This function is used to add a like
 */
exports.likePost = (req, res, next) => {
  console.log('post liked !');
};
