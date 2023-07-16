const DataTypes = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tasks", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      urgency: {
        type: DataTypes.INTEGER,
      },
      taskListId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "task_lists",
            key: "id",
          },
        },
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tasks");
  },
};
