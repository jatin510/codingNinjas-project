const Post = require("../models/post");

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
