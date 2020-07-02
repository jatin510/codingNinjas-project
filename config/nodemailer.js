const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "@gmail.com", // generated ethereal user
    pass: "@6972",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    (err, template) => {
      if (err) return console.log("error in rendering html template", err);

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter,
  renderTemplate,
};
