import BookModel from "../models/books";
import UserModel from "../models/users";
import HireRequestModel from "../models/hireRequest";

export default class CardController {
  constructor(cardView) {
    this.cardView = cardView;
    this.bookModel = new BookModel();
    this.userModel = new UserModel();
    this.hireRequestModel = new HireRequestModel();
  }

  // Call handler from hire request view
  callViewHandler() {
    this.displayOnView();
  }

  displayOnView = async () => {
    // Get the book and handle data displayed on the view
    const books = await this.bookModel.getBooks();
    this.cardView.displayBooks(books);

    // Get the user and handle data displayed on the view
    const users = await this.userModel.getUsers();
    this.cardView.displayUsers(users);

    // Get the completed hire request and handle data displayed on the view
    const count = await this.hireRequestModel.displayDataCompletes();
    this.cardView.displayDataCompletes(count);
  };
}
