import api from "./api";

const taskService = {
  newTask: async (id, params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .post(`/taskList/${id}/newTask`, params, {
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
      .get(`/taskList/${id}`, {
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
      .get(`/taskList/${id}/search?name=${name}`, {
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
      .delete(`/taskList/${id}`, params, {
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
      .put(`/taskList/edit/${id}`, params, {
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
