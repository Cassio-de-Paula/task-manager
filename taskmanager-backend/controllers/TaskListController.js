const taskListService = require("../services/taskListService");

module.exports = {
  async newTaskList(req, res) {
    const { name } = req.body;
    const userId = req.params.id;

    try {
      const taskList = await taskListService.createTaskList({ name, userId });

      if (!userId) {
        throw new Error();
      }

      return res.status(200).json(taskList);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getTaskLists(req, res) {
    const userId = req.params.id;

    try {
      const taskLists = await taskListService.getLists({
        userId,
      });

      if (!userId) {
        throw new Error();
      }

      if (!taskLists) {
        throw new Error("Você não possui listas de tarefas");
      }

      return res.status(200).json(taskLists);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async searchTaskLists(req, res) {
    const name = req.query.name;
    const userId = req.params.id;

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
    const { id, name } = req.body;

    try {
      const taskList = await taskListService.updateTaskList(id, {
        name,
      });

      return res.status(200).json(taskList);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteTaskList: async (req, res) => {
    const { id } = req.body;
    const userId = req.params.id;

    try {
      await taskListService.removeTaskList({ id, userId });

      if (!id) {
        throw new Error();
      }

      return res.status(200).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
