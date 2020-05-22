const User = require("../models/user");
module.exports.profile = (req, res) => {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, (err, user) => {
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

// redner sign up page
module.exports.signUp = (req, res) => {
  return res.render("user_sign_up", { title: "Codial | Sign Up" });
};

// render sing in page
module.exports.signIn = (req, res) => {
  return res.render("user_sign_in", { title: "Codial | Sign In" });
};

// get the signUp data
module.exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return console.log("error finding user in signup ", err);

    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) return console.log("error in creating user during signup");

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = (req, res) => {
  // find the user
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return console.log("error in finding user during signin", err);
    // handle user found
    if (user) {
      // handle mismatching or passwords that do not match
      if (user.password != req.body.password) return res.redirect("back");

      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      // handle user not found
      return res.redirect("back");
    }
  });
};
