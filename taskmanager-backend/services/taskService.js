const Task = require("../models/Task");
const { Op } = require("sequelize");

module.exports = {
  createTask: async (data) => {
    const task = await Task.create(data);
    return task;
  },

  getTasks: async (taskListId) => {
    const tasks = await Task.findAll({
      where: {
        taskListId,
      },
    });

    return tasks;
  },

  getTasksByName: async ({ name, userId }) => {
    const tasks = await Task.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        userId,
      },
    });

    return tasks;
  },
  updateTask: async (id, data) => {
    const [affectedRows, updatedTasks] = await Task.update(data, {
      where: { id },
      returning: true,
    });

    return updatedTasks[0];
  },

  removeTask: async ({ id }) => {
    await Task.destroy({
      where: {
        id,
      },
    });
  },

  removeAll: async (id) => {
    await Task.destroy({
      where: {
        taskListId: id,
      },
    });
  },
};
