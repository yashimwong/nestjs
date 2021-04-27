const fs = require("fs");

const express = require("express");
const port = 3000;
const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

app.get("/", (req, res) => {
  res.send(`
    <form action="/add-message" method="POST">
        <input name="message" type="text" />
        <button type="submit">Submit Message</button>
    </form>
    `);

  res.end();
});

app.post("/add-message", (req, res) => {
  res.send(`
    <h1>Message Sent!!</h1>
    `);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
