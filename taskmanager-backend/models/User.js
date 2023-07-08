const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define("users", {
  userName: DataTypes.STRING,
  email: DataTypes.STRING,
  birth: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = User;
