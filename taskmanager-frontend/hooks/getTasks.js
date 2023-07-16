import taskService from "../src/services/taskService";

export const tasksHook = {
  tasks: async function (id) {
    const { data } = await taskService.getTasks(id);

    return data;
  },
};
