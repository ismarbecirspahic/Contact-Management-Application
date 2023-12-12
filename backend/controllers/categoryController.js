const { Category } = require("../models");
const { Op } = require("sequelize");

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.send(categories);
    } catch (err) {
      console.error("Error getting categories:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCategoryById(req, res) {
    const categoryId = req.params.id;

    try {
      const category = await Category.findByPk(categoryId);
      if (category) {
        res.send(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (err) {
      console.error("Error getting category by ID:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async addCategory(req, res) {
    const newCategory = req.body;

    try {
      await Category.create(newCategory).then(() =>
        res.status(201).send("Category addition was successful")
      );
    } catch (err) {
      console.error("Error inserting category:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateCategory(req, res) {
    const categoryId = req.params.id;
    const updatedCategory = req.body;

    try {
      await Category.update(updatedCategory, { where: { id: categoryId } });
      res.status(200).send("Category update was successful");
    } catch (err) {
      console.error("Error updating category:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteCategory(req, res) {
    const categoryId = req.params.id;

    try {
      await Category.destroy({ where: { id: categoryId } });
      if (categoryId === null) await Category.update({ name: "Other" });
      res.status(200).send("Category deletion was successful");
    } catch (err) {
      console.error("Error deleting category:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async restoreCategory(req, res) {
    const categoryId = req.params.id;
    try {
      await Category.restore({ where: { id: categoryId } });
      res.status(200).send("Contact restored successfully");
    } catch (err) {
      console.error("Error restoring a contact:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getDeletedCategories(req, res) {
    console.log(req.query);
    try {
      const deletedCategories = await Category.findAll({
        where: {
          deletedAt: {
            [Op.not]: null,
          },
        },
        paranoid: false,
      });

      res.status(200).json(deletedCategories);
    } catch (error) {
      console.error("Error fetching deleted contacts:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new CategoryController();
