const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

app.use(express.urlencoded());
app.use(cookieParser());
// setting up layouts
app.use(expressLayouts);
// extract style and script from sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));

//set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codeial",
    // TODO
    secret: "random",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// middleware
// express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) return console.log(`Error  : ${err}`);

  console.log(`Server running on port : ${port}`);
});
