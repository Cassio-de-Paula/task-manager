const taskService = require("../services/taskService");
const taskListService = require("../services/taskListService");
const { getTaskLists } = require("./TaskListController");
const TaskListController = require("./TaskListController");

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
      return res.status(400).json({ message: error.message });
    }
  },

  getTasksWithNotifications: async (req, res) => {
    const userId = req.user.id;

    const taskLists = await taskListService.getLists({ userId });

    try {
      const taskList = await Promise.all(
        taskLists.map(async (taskList) => {
          return await taskService.getTasks(taskList.id);
        })
      );

      const taskNotifications = await Promise.all(
        taskList.map(async (tasks) => {
          return await Promise.all(
            tasks.map(async (task) => {
              const today = new Date();
              if (task.deadline) {
                const difference = Math.floor(
                  (task.deadline.getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24) +
                    1
                );

                if (difference == task.urgency) {
                  return task;
                } else {
                  return;
                }
              } else {
                return;
              }
            })
          );
        })
      );

      return res.status(200).json(taskNotifications);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
