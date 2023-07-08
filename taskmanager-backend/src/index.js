const express = require("express");
const routes = require("./routes");
const sequelize = require("../config/sequelize");

const app = express();

app.use(express.json());
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connection successfull");
  });
  console.log(`Server started successfully at PORT ${PORT}`);
});
