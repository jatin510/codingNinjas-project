const passport = require("passport");
const User = require("../models/user");

const LocalStrategy = require("passport-local").Strategy;

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    // find a user and establish the identity
    User.findOne({ email }, (err, user) => {
      if (err) {
        console.log("eError in finding user --> password");
        return done(err);
      }

      if (!user || user.password != password) {
        console.log("Invalid Username / password");

        return done(null, false);
      }

      return done(null, user);
    });
  })
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
    if (!user || user.password != password) {
      console.log("Invalid Username / password deserialize");

      return done(null, false);
    }

    return done(null, user);
  });
});
