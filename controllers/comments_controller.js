const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = (req, res) => {
  console.log(req.body.post);
  Post.findById(req.body.post, (err, post) => {
    if (err) return console.log("error in post comment", err);

    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        (err, comment) => {
          // eerr
          if (err) return console.log("comment error", err);

          post.comments.push(comment);
          post.save().then((data) => {
            console.log("post", data);
          });

          return res.redirect("/");
        }
      );
    }
  });
};
