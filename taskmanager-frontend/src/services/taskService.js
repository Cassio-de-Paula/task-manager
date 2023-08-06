import api from "./api";

const taskService = {
  newTask: async (taskListId, data) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .post(`/home/taskLists/${taskListId}/tasks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getTasks: async (taskListId) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .get(`/home/taskLists/${taskListId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getTasksByName: async (name) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .get(`/home/tasks/search?name=${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res.data;
  },

  removeTask: async (taskListId, id) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .delete(`/home/taskLists/${taskListId}/tasks/${id}`, {
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

  updateTask: async (taskListId, data) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .put(`/home/taskLists/${taskListId}/tasks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  getNotifications: async () => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .get(`/notifications`, {
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
