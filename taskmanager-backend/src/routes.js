const express = require("express");
const routes = express.Router();

const UserController = require("../controllers/UserController");
const TaskListController = require("../controllers/TaskListController");
const TaskController = require("../controllers/TaskController");

// Rotas de Users
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.put("/account/:id", UserController.updateUser);
routes.put("/password/:id", UserController.updatePassword);

// Rotas de listas de tarefas
routes.post("/home/:id/newList", TaskListController.newTaskList);
routes.get("/home/:id/search", TaskListController.searchTaskLists);
routes.get("/home/:id/taskLists", TaskListController.getTaskLists);
routes.put("/home/:id/edit", TaskListController.saveTaskList);
routes.delete("/home/:id", TaskListController.deleteTaskList);

//Rotas de tarefas
routes.post("/taskList/:id", TaskController.newTask);
routes.get("/taskList/:id", TaskController.getTasks);
routes.get("/taskList/:id/search", TaskController.searchTask);
routes.put("/taskList/edit/:id", TaskController.saveTask);
routes.delete("/taskList/:id", TaskController.deleteTask);

module.exports = routes;
