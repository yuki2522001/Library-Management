import UserView from "../views/users";
import UserModel from "../models/users";
import UserController from "../controllers/users";

const UserApp = new UserController(new UserModel(), new UserView());
UserApp.callViewUserHandle();
