const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Task = sequelize.define("tasks", {
  name: DataTypes.STRING,
  deadline: DataTypes.DATE,
  done: DataTypes.BOOLEAN,
  urgency: DataTypes.INTEGER,
  taskListId: DataTypes.STRING,
});

module.exports = Task;
