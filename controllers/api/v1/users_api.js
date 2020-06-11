const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    console.log(user);
    console.log(req.body.email);
    if (!user || user.password != req.body.password) {
      return res.json(422, { message: "invalid username or password" });
    }
    return res.json(200, {
      message: "Sign in successfull",
      data: {
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: 100000 }),
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};
