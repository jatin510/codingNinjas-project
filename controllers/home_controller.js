const Post = require("../models/post");
const User = require("../models/user");

// async
module.exports.home = async function (req, res) {
  // populate the user of each post
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "Codeial | Home",
      posts,
      all_users: users,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.nothome = function (req, res) {
  // populate the user of each post
  Post.find({})
    .then((data) => console.lof(data))
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, posts) => {
      User.find({}, (err, users) => {
        if (err) return console.log("home fetching user error : ", err);
        return res.render("home", {
          title: "Codeial | Home",
          posts,
          all_users: users,
        });
      });
      if (err) return console.log("error in home controller");
    });
};
