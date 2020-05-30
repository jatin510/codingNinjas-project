const passport = require("passport");
const User = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // find a user and establish the identity
      User.findOne({ email }, (err, user) => {
        if (err) {
          req.flash("error", err);
          return done(err);
        }

        if (!user || user.password != password) {
          req.flash("error", "Invalid username or password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// serialize the user to decide which key is to kept at browser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the user from the key in the cookies
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("error in finding user deserialize");
      return done(null);
    }
    if (!user) {
      console.log("Invalid Username / password deserialize");

      return done(null, false);
    }

    return done(null, user);
  });
});

// check if user is autheticated
passport.checkAuthentication = (req, res, next) => {
  // if the user is signed in, then pass on the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // res.user contains the current signed in user
    res.locals.user = req.user;
  }

  next();
};
