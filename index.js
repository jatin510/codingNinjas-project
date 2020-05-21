const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

// middleware
// express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) return console.log(`Error  : ${err}`);

  console.log(`Server running on port : ${port}`);
});
