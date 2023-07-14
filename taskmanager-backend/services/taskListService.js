const TaskList = require("../models/TaskList");
const { Op } = require("sequelize");

module.exports = {
  createTaskList: async ({ name, color, userId }) => {
    const taskList = await TaskList.create({ name, color, userId });
    return taskList;
  },

  getLists: async ({ userId }) => {
    const taskLists = await TaskList.findAll({
      where: {
        userId,
      },
    });

    return taskLists;
  },

  getTaskListByName: async ({ name, userId }) => {
    const taskList = await TaskList.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        userId,
      },
    });

    return taskList;
  },

  updateTaskList: async (id, name, color) => {
    const [affectedRows, updatedTaskLists] = await TaskList.update(
      name,
      color,
      {
        where: { id },
        returning: true,
      }
    );

    return updatedTaskLists[0];
  },

  removeTaskList: async ({ id }) => {
    await TaskList.destroy({
      where: {
        id,
      },
    });
  },
};
