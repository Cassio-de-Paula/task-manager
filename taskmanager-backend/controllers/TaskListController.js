const taskListService = require("../services/taskListService");

module.exports = {
  async newTaskList(req, res) {
    const { name, color } = req.body;
    const userId = req.user.id;

    try {
      const taskList = await taskListService.createTaskList({
        name,
        color,
        userId,
      });

      if (!userId) {
        throw new Error();
      }

      return res.status(200).json(taskList);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getTaskLists(req, res) {
    const userId = req.user.id;

    try {
      const taskLists = await taskListService.getLists({
        userId,
      });

      if (!userId) {
        throw new Error();
      }

      return res.status(200).json(taskLists);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async searchTaskLists(req, res) {
    const name = req.query.name;
    const userId = req.user.id;

    try {
      const taskLists = await taskListService.getTaskListByName({
        name,
        userId,
      });

      if (!userId) {
        throw new Error();
      }

      if (taskLists.length == 0) {
        throw new Error("Sem resultados para a pesquisa");
      }

      return res.status(200).json(taskLists);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  saveTaskList: async (req, res) => {
    const { id, data } = req.body;

    try {
      const taskList = await taskListService.updateTaskList({
        id,
        data,
      });

      return res.status(200).json(taskList);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
