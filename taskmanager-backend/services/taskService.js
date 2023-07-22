const Task = require("../models/Task");
const { Op } = require("sequelize");

module.exports = {
  createTask: async (data) => {
    const task = await Task.create(data);
    return task;
  },

  getTasks: async ({ taskListId }) => {
    const tasks = await Task.findAll({
      where: {
        taskListId,
      },
    });

    return tasks;
  },

  getTasksByName: async ({ name, taskListId }) => {
    const tasks = await Task.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        taskListId,
      },
    });

    return tasks;
  },

  updateTask: async (id, params) => {
    const [affectedRows, updatedTasks] = await Task.update(
      {
        params,
      },
      { where: { id }, returning: true }
    );

    return updatedTasks[0];
  },

  removeTask: async (id) => {
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
