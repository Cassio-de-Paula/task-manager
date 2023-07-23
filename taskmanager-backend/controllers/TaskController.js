const taskService = require("../services/taskService");
const taskListService = require("../services/taskListService");

module.exports = {
  async newTask(req, res) {
    const data = req.body;

    try {
      const task = await taskService.createTask(data);

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getTasks(req, res) {
    const { taskListId } = req.params;

    try {
      const tasks = await taskService.getTasks(taskListId);

      if (!taskListId) {
        throw new Error();
      }

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async searchTask(req, res) {
    const name = req.query.name;
    const { taskListId } = req.params;

    try {
      const task = await taskService.getTasksByName({
        name,
        taskListId,
      });

      if (!taskListId) {
        throw new Error();
      }

      if (task.length === 0) {
        throw new Error("Sem resultados para a pesquisa");
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  saveTask: async (req, res) => {
    const data = req.body;
    const { id } = data;

    console.log(id, data);

    try {
      const task = await taskService.updateTask(id, data);

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await taskService.removeTask({ id });

      if (!id) {
        throw new Error();
      }

      return res.status(200).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteAll: async (req, res) => {
    const id = req.params.id;

    try {
      await taskService.removeAll(id);
      await taskListService.removeTaskList(id);

      return res.status(200).send();
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  },
};
