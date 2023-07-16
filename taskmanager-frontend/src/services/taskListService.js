import api from "./api";

const taskListService = {
  newTaskList: async (params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .post("/home", params, {
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
      .get("/home", {
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
      .get(`/home/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  removeTaskList: async (params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .delete("/home", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  updateTaskListName: async (params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .put("/home", params, {
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
