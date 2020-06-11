const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    // let post = Post.findById(post1.id);
    if (req.xhr) {
      return res.status(200).json({
        data: {
          post,
        },
        message: "Post created !",
      });
    }

    req.flash("success", "Post created !");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);

    return console.log("error ", err);
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted successfully",
        });
      }
      req.flash("success", "Post and comments destroyed !");

      return res.redirect("back");
    } else {
      req.flash("success", "You cannot delete this post !");

      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);

    return console.log("error ", err);
  }
};
