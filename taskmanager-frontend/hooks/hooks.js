import taskService from "../src/services/taskService";
import taskListService from "../src/services/taskListService";

export const taskListHook = {
  taskLists: async function () {
    const { data } = await taskListService.getTaskLists();

    await Promise.all(
      data.map(async (taskList) => {
        let counter = await tasksHook.tasks(taskList.id);

        taskList.taskCounter = counter.length;
      })
    );

    return data;
  },
};

export const tasksHook = {
  tasks: async function (id) {
    const { data } = await taskService.getTasks(id);

    return data;
  },
};

export function dateFormat(deadline) {
  const data = new Date(deadline);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const newDeadline = data.toLocaleDateString(undefined, options);

  return newDeadline;
}

export async function taskNotifications() {
  const { data } = await taskListService.getTaskLists();

  const notifications = await Promise.all(
    data.map(async (taskList) => {
      const taskLists = await tasksHook.tasks(taskList.id);
      return taskLists;
    })
  );

  const filteredTasks = notifications.map((taskList) => {
    const filteredTasksList = taskList.filter((task) => {
      const deadline = new Date(task.deadline).getTime();
      const today = new Date().getTime();
      const difference = Math.floor(
        (deadline - today) / task.urgency / (1000 * 60 * 60 * 24)
      );
      return difference === 0;
    });
    return filteredTasksList;
  });

  const taskListIds = [];

  filteredTasks.map((taskList) => {
    taskList.map((task) => {
      let taskListId = task.taskListId;
      taskListIds.push(taskListId);
    });
  });

  return { filteredTasks, taskListIds, data };
}
