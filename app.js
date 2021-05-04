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

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sorted_products = [...products];
  if (search) {
    sorted_products = sorted_products.filter((p) => p.name.startsWith(search));
  }
  if (limit) {
    sorted_products = sorted_products.slice(0, Number(limit));
  }
  if (sorted_products.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  return res.status(200).json(sorted_products);
});

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
