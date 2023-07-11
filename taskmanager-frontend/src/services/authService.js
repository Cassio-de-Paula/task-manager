import api from "./api";

const authService = {
  register: async (params) => {
    const res = await api.post("/register", params).catch((err) => {
      if (err.response.status === 400) {
        return err.response;
      }

      return err;
    });

    return res;
  },

  login: async (params) => {
    const res = await api.post("/login", params).catch((err) => {
      if (err.response.status === 400) {
        return err.response;
      }

      return err;
    });

    if (res.status === 200) {
      sessionStorage.setItem("taskManager-token", res.data.token);
    }

    return res;
  },
};

export default authService;
