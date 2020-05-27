const Post = require("../models/post");

module.exports.home = function (req, res) {
  // Post.find({}, (err, posts) => {
  //   if (err) return console.log("error in home controller");
  //   console.log(posts);
  //   return res.render("home", { title: "Codeial | Home", posts });
  // });

  // populate the user of each post
  Post.find({})
    .populate("user")
    .exec((err, posts) => {
      if (err) return console.log("error in home controller");
      return res.render("home", { title: "Codeial | Home", posts });
    });
};
