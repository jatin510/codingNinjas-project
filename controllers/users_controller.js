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
