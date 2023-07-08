const userService = require("../services/userService");

module.exports = {
  register: async (req, res) => {
    const { userName, email, birth, password } = req.body;

    try {
      const user = await userService.createUser({
        userName,
        email,
        birth,
        password,
      });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: "E-mail já está em uso!" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findUser({
        email,
        password,
      });

      if (user === null) {
        throw new Error();
      }
      return res.status(200).json({ message: "Bem-vindo de volta!" });
    } catch (error) {
      return res.status(404).json({ message: "Usuário ou senha incorretos" });
    }
  },

  updateUser: async (req, res) => {
    const id = req.params.id;
    const { userName } = req.body;

    try {
      const user = await userService.updateUsername(id, {
        userName,
      });

      if (user === null) {
        throw new Error();
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  updatePassword: async (req, res) => {
    const { password } = req.body;
    const id = req.params.id;

    try {
      const newPassword = await userService.updatePassword(id, {
        password,
      });

      if (newPassword === null) {
        throw new Error();
      }

      return res.status(200).json(newPassword);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
