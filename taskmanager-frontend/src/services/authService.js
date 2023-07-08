import api from "./api";

const authService = {
  register: async ({ userName, email, birth, password }) => {
    const res = await api
      .post("/register", { userName, email, birth, password })
      .catch((err) => {
        if (err.response.status === 400) {
          return err.response;
        }
        return err;
      });
    return res;
  },

  login: async ({ email, password }) => {
    const res = await api.post("/login", { email, password }).catch((err) => {
      if (err.response.status === 400) {
        return err.response;
      }
      return err;
    });
    return res;
  },
};

export default authService;
