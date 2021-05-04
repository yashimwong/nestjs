const express = require("express");
const app = express();

const auth = require("./authorize");
const logger = require("./logger");

// Pass in middleware to app.use to use it on all route
// order matters. Only those below this uses the middleware
app.use([auth, logger]);

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  console.log(req.user);
  res.send("About");
});

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
