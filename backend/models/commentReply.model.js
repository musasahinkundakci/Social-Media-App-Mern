const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentReplySchema = new Schema({
  parentComment: {
    type: Schema.ObjectId,
    ref: 'Comment',
  },
  tag: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: Schema.ObjectId,
      ref: 'User',
    },
  ],
  message: String,
  author: {
    type: Schema.ObjectId,
    ref: 'User',
  },
});
module.exports = mongoose.model('CommentReply', CommentReplySchema);
