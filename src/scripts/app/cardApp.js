import CardController from "../controllers/card";
import BookModel from "../models/books";
import HireRequestModel from "../models/hireRequest";
import UserModel from "../models/users";
import CardView from "../views/card";

const CardApp = new CardController(
  new CardView(),
  new BookModel(),
  new UserModel(),
  new HireRequestModel(),
);

CardApp.callViewHandler();
