const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    body: String,
    photos: [String],
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [
      {
        text: String,
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
      },
    ],
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
