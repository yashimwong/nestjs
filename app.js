const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./public"));

app.get("/people", (req, res) => {
  return res.status(200).json({ success: true, data: people });
});

app.get("/people/:id", (req, res) => {
  const { id } = req.params;
  const filtered_people = people.find((p) => p.id === Number(id));
  if (!filtered_people) {
    return res
      .status(200)
      .json({ success: false, data: "No people found matching your query." });
  }
  res.status(200).json({ success: true, data: filtered_people });
});

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
2;
