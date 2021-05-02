const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./public"));

app.all("*", (req, res) => {
  res.status(400).send("Resource not found");
});

app.listen(5000, () => {
  console.log("Server is listening on http://localhost:5000");
});
