const items = require("../models/itemModel");

exports.getAllItems = (req, res) => {
    console.log("Fetching all items...");
    console.log(items);
  
    const sortedItems = items.filter(item => item.active).sort((a, b) => a.price - b.price);
    res.render("items", { items: sortedItems });
  };
  

exports.getItemDetails = (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).render("error", { message: "Item not found" });
  res.render("item", { item });
};

exports.getAllItems = (req, res) => {
    const sortedItems = items.filter(item => item.active).sort((a, b) => a.price - b.price);
    res.render("items", { items: sortedItems });
};

exports.getItemDetails = (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).render("error", { message: "Item not found" });
    res.render("item", { item });
};

exports.createItem = (req, res) => {
    console.log("Form submission received:", req.body);
    console.log("Uploaded file:", req.file);

    const newItem = {
        id: items.length + 1,
        title: req.body.title,
        seller: req.body.seller,
        condition: req.body.condition,
        price: parseFloat(req.body.price),
        image: req.file ? `/images/${req.file.filename}` : "/images/default.png",
        description: req.body.description,
        active: true,
        totalOffers: 0
    };

    items.push(newItem);
    console.log("New item added:", newItem);
    res.redirect("/items");
};

exports.getEditPage = (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).render("error", { message: "Item not found" });
  res.render("edit", { item });
};

exports.editItem = (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).render("error", { message: "Item not found" });
  
  item.title = req.body.title;
  item.seller = req.body.seller;
  item.condition = req.body.condition;
  item.price = parseFloat(req.body.price);
  item.description = req.body.description;
  if (req.file) {
    item.image = `/images/${req.file.filename}`;
  }
  
  res.redirect(`/items/${item.id}`);
};

exports.deleteItem = (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).render("error", { message: "Item not found" });
  items.splice(index, 1);
  res.redirect("/items");
};