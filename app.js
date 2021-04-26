const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

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
