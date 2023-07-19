import api from "./api";

const taskService = {
  newTask: async (id, params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .post(`/home/taskLists/tasks/${id}`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getTasks: async (id) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .get(`/home/taskLists/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getTasksByName: async (id, name) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .get(`/home/taskLists/tasks/${id}/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  removeTask: async (id, params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .delete(`/home/taskLists/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  removeAllTasks: async (id) => {
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

  updateTaskName: async (id, params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .put(`/home/taskLists/${id}`, params, {
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

export default taskService;
