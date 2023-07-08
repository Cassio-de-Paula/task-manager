const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const TaskList = sequelize.define("task_lists", {
  name: DataTypes.STRING,
  userId: DataTypes.INTEGER,
});

module.exports = TaskList;
