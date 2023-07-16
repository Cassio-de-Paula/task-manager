import taskListService from "../src/services/taskListService";

export const taskListHook = {
  taskLists: async function () {
    const { data } = await taskListService.getTaskLists();

    return data;
  },
};
