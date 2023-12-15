"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // Define association with the Category model
      Contact.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Contact.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      address: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Categories",
          },
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Contact",
      paranoid: true,
    }
  );
  return Contact;
};
