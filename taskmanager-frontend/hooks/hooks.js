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
