const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

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
