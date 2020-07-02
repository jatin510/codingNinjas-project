const nodemailer = require("../config/nodemailer.js");

exports.newComment = (comment) => {
  // console.log("inside new Comment mailer", comment);
  let htmlString = nodemailer.renderTemplate(
    { comment },
    "/comments/new_comment.ejs"
  );
  // let htmlString = "<h1>hello</h1>";
  nodemailer.transporter.sendMail(
    {
      from: "jatin6972@gmail.com",
      to: "jatin6972@gmail.com",
      subject: "New Comment Published",
      html: htmlString,
    },
    (err, info) => {
      if (err) return console.log("Error in sending mail", err);

      console.log("Message send", info);
    }
  );

  console.log("inside mailer callback");
};
