import express from "express";

import ClassesController from "./controllers/ClassesController";
import ConnectionController from "./controllers/ConnectionsController";
import TeacherConnectionsController from "./controllers/TeacherConnectionsController";
import UsersController from "./controllers/UsersController";
import SignupController from "./controllers/SignupController"

const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const teacherConnectionsController = new TeacherConnectionsController();
const usersController = new UsersController()
const signupController = new SignupController();

const routes = express.Router();

routes.get("/classes", classesController.index);
routes.get("/classes/:id", classesController.show);
routes.post("/classes", classesController.create);
routes.delete("/classes/:id", classesController.delete)

routes.get("/connections/teachers", teacherConnectionsController.index);
routes.get("/connections/entries", connectionsController.index);
routes.post("/connections/entries", connectionsController.create);

routes.get("/users", usersController.index);
routes.get("/users/:id", usersController.show)
routes.put("/users/:id", usersController.update)
routes.post("/signUp", usersController.create);

routes.get("/login", signupController.index);

export default routes;