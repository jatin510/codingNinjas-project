const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return console.log(err);
    return res.render("user_profile", { title: "codieal", profile_user: user });
  });
};

module.exports.update = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      User.uploadedAvatar(req, res, (err) => {
        if (err) return console.log("Multer error", err);

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          user.avatar = User.avatarPath + "/" + req.file.filename;
        }

        user.save();

        return res.redirect("back");
      });
    } catch (err) {
      console.log(err);
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    return res.status(401).send("unauthorised");
  }
};

// redner sign up page
module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", { title: "Codial | Sign Up" });
};

// render sing in page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    console.log("authenticated");
    return res.redirect("/users/profile/" + req.user.id);
  }
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
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout();
  req.flash("success", "Logged Out");

  return res.redirect("/");
};
