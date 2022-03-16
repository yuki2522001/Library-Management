import { VALIDATE_MSG, SUCCESS_MSG } from "../constants/message";
import {
  isRequired, isFormatNumber, isCompareNumber,
} from "../helpers/validation";

export default class BookController {
  constructor(bookModel, bookView) {
    this.bookModel = bookModel;
    this.bookView = bookView;
  }

  // Call handler from book view
  callViewBookHandle() {
    this.getBooks();
    this.bookView.bindConfirmDeleteBook();
    this.bookView.bindOpenTask();
    this.bookView.bindCloseTask();
    this.bookView.bindCloseDeleteModal();
    this.bookView.bindAddBookElement(this.handlerAddBook);
    this.bookView.bindDeleteBookElement(this.handlerDeleteBook);
    this.bookView.bindDisplayBookOnModal();
    this.bookView.bindUpdateBook(this.handlerUpdateBook);
  }

  // Display data on dom
  getBooks = async () => {
    this.bookModel.bookData = await this.bookModel.getBooks();
    // Render book list
    this.bookView.renderBook(this.bookModel.bookData);
  };

  // Handle add book in both view and model
  handlerAddBook = async (title, author, price, totalQty, availableQty) => {
    /**
     * Display validate message if input text value is empty
     */
    if (!isRequired(title)) {
      this.bookView.checkBookTitleIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    if (!isRequired(author)) {
      this.bookView.checkAuthorIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if price is empty
    */
    if (!isRequired(price)) {
      this.bookView.checkFormatPrice(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if price is negative
    */
    if (!isFormatNumber(price)) {
      this.bookView.checkFormatPrice(VALIDATE_MSG.MESSAGE_NUMBER_FORMAT);
      return;
    }

    /**
     * Display validate message if total quantity is empty
    */
    if (!isRequired(totalQty)) {
      this.bookView.checkFormatTotalQty(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if total quantity is negative
    */
    if (!isFormatNumber(totalQty)) {
      this.bookView.checkFormatTotalQty(VALIDATE_MSG.MESSAGE_NUMBER_FORMAT);
      return;
    }

    /**
     * Display validate message if available quantity is empty
    */
    if (!isRequired(availableQty)) {
      this.bookView.checkFormatAvailableQty(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if available quantity is greater than total quantity
    */
    if (!isCompareNumber(totalQty, availableQty)) {
      this.bookView.checkFormatAvailableQty(VALIDATE_MSG.MESSAGE_COMPARE_NUMBER);
      return;
    }

    try {
      const newBook = await this.bookModel.addBook(title, author, price, totalQty, availableQty);
      this.bookView.appendBook(newBook);
      this.bookView.showSuccessMsg(SUCCESS_MSG.MESSAGE_ADD_BOOK);
    } catch (err) {
      this.bookView.showErrorMsg(err);
    }
  };

  // Handle delete book in both view and model
  handlerDeleteBook = (id) => {
    try {
      this.bookModel.deleteBook(id);
      this.bookView.deleteBookElement(id);
      this.bookView.showSuccessMsg(SUCCESS_MSG.MESSAGE_DELETE_BOOK);
    } catch (error) {
      this.bookView.showErrorMsg(error);
    }
  };

  // Handle update book in both view and model
  handlerUpdateBook = async (id, title, author, price, totalQty, availableQty) => {
    try {
      const book = await
      this.bookModel.updateBook(id, title, author, price, totalQty, availableQty);
      this.bookView.updateBookElement(book);
      this.bookView.showSuccessMsg(SUCCESS_MSG.MESSAGE_UPDATE_BOOK);
    } catch (error) {
      this.bookView.showErrorMsg(error);
    }
  };
}
