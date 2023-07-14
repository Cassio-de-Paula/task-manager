const express = require("express");
const routes = require("./routes");
const sequelize = require("../config/sequelize");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log("DB connection successfull");
  });
  console.log(`Server started successfully at PORT ${PORT}`);
});
