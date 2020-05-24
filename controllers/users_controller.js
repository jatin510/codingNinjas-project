const User = require("../models/user");
module.exports.profile = (req, res) => {
  res.end("<h1>user profile</h1>");
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
    if (err) console.log("error finding user in signup ", err);

    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) console.log("error in creating user during signup");

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.createSession = (req, res) => {
  return res.redirect("/");
};
