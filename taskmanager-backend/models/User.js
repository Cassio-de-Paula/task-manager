const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "users",
  {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    birth: DataTypes.DATE,
    password: DataTypes.STRING,
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 5);
        }
      },
    },
  }
);

module.exports = User;
