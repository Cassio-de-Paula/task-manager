const taskService = require("../services/taskService");

module.exports = {
  async newTask(req, res) {
    const { name, deadline, urgency } = req.body;
    const taskListId = req.params.id;

    try {
      const task = await taskService.createTask({
        name,
        deadline,
        urgency,
        taskListId,
      });

      if (!taskListId) {
        throw new Error();
      }

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getTasks(req, res) {
    const taskListId = req.params.id;

    try {
      const tasks = await taskService.getTasks({
        taskListId,
      });

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
    const taskListId = req.params.id;

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
    const { name, deadline, urgency, done } = req.body;
    const id = req.params.id;

    try {
      const task = await taskService.updateTask(id, {
        name,
        deadline,
        urgency,
        done,
      });

      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.body;
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
};
