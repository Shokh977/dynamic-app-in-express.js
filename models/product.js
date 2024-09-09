
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, // Corrected typo here
    allowNull: false, // Corrected typo here
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false, // Ensure to explicitly mention allowNull if required
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false, // Corrected typo here
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false, // Corrected typo here
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false, // Corrected typo here
  },
});



module.exports = Product;
