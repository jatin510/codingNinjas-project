const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

// setting up layouts
app.use(expressLayouts);
// extract style and script from sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));

//set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// middleware
// express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) return console.log(`Error  : ${err}`);

  console.log(`Server running on port : ${port}`);
});
