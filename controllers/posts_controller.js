const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = (req, res) => {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    (err, post) => {
      if (err) return console.log("error in creating post", err);

      return res.redirect("back");
    }
  );
};

module.exports.destroy = (req, res) => {
  console.log("destrot");
  Post.findById(req.params.id, (err, post) => {
    if (err) return console.log(err + "error in destroy post");

    // .id means converting the object id into string
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: req.params.id }).then(() => {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
