import express from "express";

import ClassesController from "./controllers/ClassesController";
import ConnectionController from "./controllers/ConnectionsController";
import SignupController from "./controllers/SignupController";
import UsersController from "./controllers/UsersController";

const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const usersController = new UsersController()
const signUpController = new SignupController()

import { isAuthenticated } from "./service/auth"

const routes = express.Router();

routes.get("/classes", classesController.index);
routes.post("/classes", classesController.create);

routes.get("/connections", connectionsController.index);
routes.post("/connections", connectionsController.create);

routes.get("/login", usersController.index);
routes.post("/register", usersController.create);

export default routes;

//Params:
/*Request body 
    request.body
*/
/*Query params: 
    /users?page=2&sort=name
    request.query
*/

/*Route params: 
    /user/:id 
    request.param
*/