const Task = require("../models/Task");
const { Op } = require("sequelize");

module.exports = {
  createTask: async ({ name, deadline, urgency, taskListId }) => {
    const task = await Task.create({ name, deadline, urgency, taskListId });
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

  updateTask: async (id, { name, deadline, urgency, done }) => {
    const [affectedRows, updatedTasks] = await Task.update(
      {
        name,
        deadline,
        urgency,
        done,
      },
      { where: { id }, returning: true }
    );

    return updatedTasks[0];
  },

  removeTask: async ({ id, taskListId }) => {
    await Task.destroy({
      where: {
        id,
        taskListId,
      },
    });
  },
};
