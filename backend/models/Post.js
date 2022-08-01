const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
      minLength: [6, 'Message trop court !'],
    },
    pictureUrl: { type: String },
    likes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true, default: [] },
    comments: {
      type: [
        {
          userId: String,
          firstname: String,
          lastname: String,
          comment: String,
          timestamp: Number,
        },
      ],
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
