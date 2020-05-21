const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

// middleware
// app.use("view engine", ejs);
// app.use();

app.listen(port, (err) => {
  if (err) return console.log(`Error  : ${err}`);

  console.log(`Server running on port ${port}`);
});
