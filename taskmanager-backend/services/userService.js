const User = require("../models/User");

module.exports = {
  createUser: async ({ userName, email, birth, password }) => {
    const user = await User.create({
      userName,
      email,
      birth,
      password,
    });

    return user;
  },

  findUser: async (email) => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  },

  updateUsername: async (id, { userName }) => {
    const [affectedRows, updatedUsers] = await User.update(
      { userName },
      {
        where: { id },
        returning: true,
      }
    );
    return updatedUsers[0];
  },

  updatePassword: async (id, { password }) => {
    const [affectedRows, updatedPassword] = await User.update(
      { password },
      {
        where: { id },
        returning: true,
        individualHooks: true,
      }
    );

    return updatedPassword[0];
  },
};
