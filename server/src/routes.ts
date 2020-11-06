import express, { Request, Response, NextFunction }from "express";

import ClassesController from "./controllers/ClassesController";
import ConnectionController from "./controllers/ConnectionsController";
import UsersController from "./controllers/UsersController";
import SignupController from "./controllers/SignupController"

const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const usersController = new UsersController()
const signupController = new SignupController();

const routes = express.Router();

// const authMiddleware = (request: Request, response: Response, next: NextFunction ) {
// }

routes.get("/classes", classesController.index);
routes.get("/classes/:id", classesController.show);
routes.post("/classes", classesController.create);

routes.get("/connections", connectionsController.index);
routes.post("/connections", connectionsController.create);

routes.get("/users", usersController.index);
routes.get("/users/:id", usersController.show)
routes.put("/users/:id", usersController.update)
routes.post("/signUp", usersController.create);

routes.get("/login", signupController.index);


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