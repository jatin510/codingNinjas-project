const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");

module.exports.create = (req, res) => {
  console.log(req.body.post);
  Post.findById(req.body.post, async (err, post) => {
    try {
      let post = await Post.findById(req.body.post);

      if (post) {
        let comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });

        post.comments.push(comment);
        post.save();

        comment = await comment.populate("user", "name email").execPopulate();
        // comment mailercode

        console.log("comemnt called");
        commentsMailer.newComment(comment);
        // let job = queue.create("emails", comment).save(function (err) {
        //   if (err) {
        //     console.log("Error in sending to the queue", err);
        //   }
        //   console.log("job enqueued", job.id);
        // });

        if (req.xhr) {
          return res.status(200).json({
            data: {
              comment: comment,
            },
            message: "Post created!",
          });
        }

        req.flash("success", "Comment published!");

        res.redirect("/");
      }
    } catch (err) {
      req.flash("error", err);
      return;
    }
  });
};

module.exports.destroy = (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return console.log("error deleting comment", err);

    if (comment.user == req.user.id) {
      // then remove
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        (err, post) => {
          if (err) return console.log("error in post comment :", err);
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
