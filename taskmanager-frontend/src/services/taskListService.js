import api from "./api";

const taskListService = {
  newTaskList: async (params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .post("/home/taskLists", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getTaskLists: async () => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .get("/home/taskLists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getTaskListsByName: async (name) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .get(`/home/taskLists/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  removeTaskList: async (id) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .delete(`/home/taskLists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  updateTaskList: async (params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .put("/home/taskLists", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },
};

export default taskListService;
