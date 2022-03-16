import BookController from "../controllers/books";
import BookModel from "../models/books";
import BookView from "../views/books";

const BookApp = new BookController(new BookModel(), new BookView());
BookApp.callViewBookHandle();
