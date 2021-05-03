const express = require("express");
const { products } = require("./data");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <h1>Home Page</h1>
    <a href="/api/products">Products</a>
  `);
});

app.get("/api/products", (req, res) => {
  const new_products = products.map((p) => {
    const { id, name, image } = p;
    return { id, name, image };
  });

  res.json(new_products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const single_prouct = products.find((p) => p.id === Number(id));
  if (!single_prouct) {
    res.status(404).send("Product does not exist.");
  }

  res.json(single_prouct);
});

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
