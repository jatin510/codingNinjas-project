const Post = require("../../../models/post.js");
const Comment = require("../../../models/comment");

module.exports.index = async (req, res) => {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, { message: "List of post", posts });
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      return res.json(200, { message: "Post and associated comments deleted" });
    } else {
      console.log(post.user);
      console.log(req.user.id);
      return res.json(401, { message: "you cannot delete this post" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};
