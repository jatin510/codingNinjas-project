const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    // comment belongs to a user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    post: {
      type: moogoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = moogoose.model("Comment", commentSchema);

module.exports = Comment;
