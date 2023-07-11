import api from "./api";

const userService = {
  updateUsername: async (params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .put(`/myAccount`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  },

  updatePassword: async (params) => {
    const token = sessionStorage.getItem("taskManager-token");

    const res = await api
      .put(`/myAccount/password`, params, {
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

export default userService;
