const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  usersLiked: { type: [String], required: true, default: [] },
});

module.exports = mongoose.model('Post', postSchema);
