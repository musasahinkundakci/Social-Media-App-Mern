const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  message: String,
  author: {
    type: Schema.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: Schema.ObjectId,
      ref: "User",
    },
  ],
  post: {
    type: Schema.ObjectId,
    ref: "Post",
  },
});
module.exports = mongoose.model("Comment", CommentSchema);
