const express = require("express");
const CategoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/", CategoryController.getAllCategories);
router.get("/deleted", CategoryController.getDeletedCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", CategoryController.addCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);
router.put("/restore/:id", CategoryController.restoreCategory);
router.delete("/", CategoryController.deleteAllCategories);

module.exports = router;
