const userService = require("../services/userService");
const bcrypt = require("bcrypt");

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
      return res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findUser(email);

      if (!user) {
        throw new Error({ message: "Email não cadastrado!" });
      }

      const matchingPasswords = await bcrypt.compare(password, user.password);

      if (!matchingPasswords) {
        throw new Error({ message: "Senha inválida!" });
      }

      const payLoad = {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      };

      const token = jwtService.signToken(payLoad, "1d");

      return res.json({ authenticated: true, ...payLoad, token });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    const id = req.user.id;
    const { userName } = req.body;

    try {
      const user = await userService.updateUsername(id, userName);

      if (user === null) {
        throw new Error();
      }

      console.log(user);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  passwordUpdate: async (req, res) => {
    const { password } = req.body;
    const id = req.user.id;

    console.log(id);

    try {
      const newPassword = await userService.updatePassword(id, password);

      if (newPassword === null) {
        throw new Error();
      }

      return res.status(200).json(newPassword);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
