const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);

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

// mongo store is used to store the session
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
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      (err) => console.log(err || "connect-mongo-setup error")
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// middleware
// express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) return console.log(`Error  : ${err}`);

  console.log(`Server running on port : ${port}`);
});
