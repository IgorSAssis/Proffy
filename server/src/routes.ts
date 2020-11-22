import express from "express";

import ClassesController from "@controllers/ClassesController";
import ConnectionController from "@controllers/ConnectionsController";
import UsersController from "@controllers/UsersController";
import AuthController from "@controllers/AuthController";

const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const usersController = new UsersController();
const authController = new AuthController();

const routes = express.Router();

routes.get("/classes", classesController.index);
routes.get("/classes/:id", classesController.show);
routes.post("/classes", classesController.create);
routes.delete("/classes/:id", classesController.delete);

routes.get("/connections/teachers", usersController.selectTotalTeachers);
routes.get("/connections/entries", connectionsController.index);
routes.post("/connections/entries", connectionsController.create);

routes.get("/users", usersController.index);
routes.get("/users/:id", usersController.show);
routes.put("/users/:id", usersController.update);
routes.post("/signUp", usersController.create);

routes.post("/forgot-password", authController.forgotPassword);
routes.post("/reset-password", authController.resetPassword);
routes.get("/login", authController.signIn);

export default routes;
