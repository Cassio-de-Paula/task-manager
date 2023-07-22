const express = require("express");
const routes = express.Router();

const UserController = require("../controllers/UserController");
const TaskListController = require("../controllers/TaskListController");
const TaskController = require("../controllers/TaskController");
const { ensureAuth } = require("../middlewares/auth");

// Rotas de Users
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.put("/myAccount", ensureAuth, UserController.updateUser);
routes.put("/myAccount/password", ensureAuth, UserController.passwordUpdate);

// Rotas de listas de tarefas
routes.post("/home/taskLists", ensureAuth, TaskListController.newTaskList);
routes.get("/home/taskLists", ensureAuth, TaskListController.getTaskLists);
routes.get(
  "/home/taskLists/search",
  ensureAuth,
  TaskListController.searchTaskLists
);
routes.put("/home/taskLists", ensureAuth, TaskListController.saveTaskList);

//Deleta a lista e as tarefas dentro dela ao mesmo tempo, o serviço das taskLists é chamado dentro do controlador de tasks
routes.delete("/home/taskLists/:id", ensureAuth, TaskController.deleteAll);

//Rotas de tarefas
routes.post("/home/taskLists/tasks/:id", ensureAuth, TaskController.newTask);
routes.get("/home/taskLists/tasks/:id", ensureAuth, TaskController.getTasks);
routes.get(
  "/home/taskLists/tasks/:id/search",
  ensureAuth,
  TaskController.searchTask
);
routes.put("/home/taskLists/tasks/:id", ensureAuth, TaskController.saveTask);
routes.delete(
  "/home/taskLists/tasks/:id",
  ensureAuth,
  TaskController.deleteTask
);

module.exports = routes;
