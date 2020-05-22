const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial_development");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connection to mongo"));

db.once("open", () => console.log("successfully connected to mongo"));

module.exports = db;
