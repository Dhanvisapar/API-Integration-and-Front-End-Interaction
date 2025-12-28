const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let items = [];
let id = 1;

/* CREATE */
app.post("/api/items", (req, res) => {
  const item = { id: id++, name: req.body.name };
  items.push(item);
  res.json(item);
});

/* READ */
app.get("/api/items", (req, res) => {
  res.json(items);
});

/* UPDATE */
app.put("/api/items/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

/* DELETE */
app.delete("/api/items/:id", (req, res) => {
  items = items.filter(i => i.id != req.params.id);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
