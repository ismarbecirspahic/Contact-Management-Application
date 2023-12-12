"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Define association with the Contact model
      Category.hasMany(models.Contact, { foreignKey: "categoryId" });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
      paranoid: true,
    }
  );
  return Category;
};
