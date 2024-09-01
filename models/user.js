const Sequelize = require("sequelize");
const db = require("../utils/database");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
