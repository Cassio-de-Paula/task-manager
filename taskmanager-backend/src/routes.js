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
routes.post("/home", ensureAuth, TaskListController.newTaskList);
routes.get("/home/search", ensureAuth, TaskListController.searchTaskLists);
routes.get("/home", ensureAuth, TaskListController.getTaskLists);
routes.put("/home", ensureAuth, TaskListController.saveTaskList);
routes.delete("/home", ensureAuth, TaskListController.deleteTaskList);

//Rotas de tarefas
routes.post("/taskList/newTask", ensureAuth, TaskController.newTask);
routes.get("/taskList/:id", ensureAuth, TaskController.getTasks);
routes.get("/taskList/:id/search", ensureAuth, TaskController.searchTask);
routes.put("/taskList/edit/:id", ensureAuth, TaskController.saveTask);
routes.delete("/taskList/:id", ensureAuth, TaskController.deleteTask);

module.exports = routes;
