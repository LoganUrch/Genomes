const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const { upload } = require("../middleware/multer"); 

// Homepage Route
router.get("/", (req, res) => {
    res.render("index");
});

// Item Routes
router.get("/items", itemController.getAllItems);
router.get("/items/new", (req, res) => res.render("new"));
router.post("/items", upload, itemController.createItem); 
router.get("/items/:id", itemController.getItemDetails);
router.get("/items/:id/edit", itemController.getEditPage);
router.post("/items/:id/edit", upload, itemController.editItem);
router.post("/items/:id/delete", itemController.deleteItem);

module.exports = router;
