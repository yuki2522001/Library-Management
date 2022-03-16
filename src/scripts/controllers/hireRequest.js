import { VALIDATE_MSG, SUCCESS_MSG } from "../constants/message";
import { isRequired, isHireRequestUp10Date } from "../helpers/validation";
import BookModel from "../models/books";
import UserModel from "../models/users";

export default class HireRequestController {
  constructor(hireRequestModel, hireRequestView) {
    this.hireRequestModel = hireRequestModel;
    this.hireRequestView = hireRequestView;
    this.bookModel = new BookModel();
    this.userModel = new UserModel();
  }

  // Call handler from hire request view
  callViewHandler() {
    this.getHireRequest();
    this.hireRequestView.bindOpenTask();
    this.hireRequestView.bindCloseTask();
    this.hireRequestView.bindDisplayBorrowBooksOnModal();
    this.hireRequestView.bindCloseDeleteModal();
    this.hireRequestView.bindCloseHireRequest();
    this.hireRequestView.bindConfirmDeleteHireRequest();
    this.hireRequestView.bindConfirmCompleteBorrowBooksElement();
    this.hireRequestView.bindAddBorrowBooksElement(this.handlerAddBorrowBooks);
    this.hireRequestView.bindDeleteBorrowBooksElement(this.handlerDeleteBorrowBooks);
    this.hireRequestView.bindUpdateBorrowBooks(this.handlerUpdateBorrowBooks);
    this.hireRequestView.bindCompleteBorrowBooksElement(this.handlerCompleteBorrowBooks);
  }

  // display data on dom
  getHireRequest = async () => {
    // Get data from user
    const users = await this.userModel.getUsers();
    // Get data from book
    const books = await this.bookModel.getBooks();
    this.hireRequestModel.hireRequestData = await this.hireRequestModel.getHireRequest();
    // Render hire request list
    this.hireRequestView.renderHireRequest(this.hireRequestModel.hireRequestData, users, books);
    // Display data user and book on select box
    this.hireRequestView.bindSelectCombobox(users, books);
  };

  // Handle add hire request in both view and model
  handlerAddBorrowBooks = async (user, book, fromDate, toDate, isComplete) => {
    /**
     * Display validate message if username value is empty
    */
    if (!isRequired(user)) {
      this.hireRequestView.checkUserNameIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if book value is empty
    */
    if (!isRequired(book)) {
      this.hireRequestView.checkBookIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if to date value is empty
    */
    if (!isRequired(toDate)) {
      this.hireRequestView.checkToDate(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if hired up to more than 10 days
    */
    if (!isHireRequestUp10Date(fromDate, toDate)) {
      this.hireRequestView.checkToDate(
        VALIDATE_MSG.MESSAGE_HIRE_REQUEST_DATE,
      );
      return;
    }

    try {
      const responseData = await this.hireRequestModel.addBorrowBooks(
        user,
        book,
        fromDate,
        toDate,
        isComplete,
      );

      // If the status is !== 200, then return the number of books greater than 5 and make message
      if (responseData.status !== 200) {
        this.hireRequestView.showErrorMsg(VALIDATE_MSG.MESSAGE_HIRE_UP_BOOK);
        return;
      }

      /**
       * Get data updateBookQuantity from bookModel
       * Now the number of books will - 1
      */
      const updatedBook = await this.bookModel.updateBookQuantity(responseData.data.book);
      // Get data update user from userModel
      const userName = await this.userModel.updateUser(responseData.data.user);
      // Get data user and book
      const userSelect = await this.userModel.getUsers();
      const bookSelect = await this.bookModel.getBooks();
      // Handle append book on view
      this.hireRequestView.appendBorrowBooks(responseData.data, userName, updatedBook);
      // Handle display data on select box
      this.hireRequestView.bindSelectCombobox(userSelect, bookSelect);
      this.hireRequestView.showSuccessMsg(SUCCESS_MSG.MESSAGE_ADD_HIRE_REQUEST);
    } catch (error) {
      this.hireRequestView.showErrorMsg(error);
    }
  };

  // Handle delete hire request in both view and model
  handlerDeleteBorrowBooks = (id) => {
    try {
      this.hireRequestModel.deleteBorrowBooks(id);
      this.hireRequestView.deleteBorrowBooksElement(id);
      this.hireRequestView.showSuccessMsg(SUCCESS_MSG.MESSAGE_DELETE_HIRE_REQUEST);
    } catch (error) {
      this.hireRequestView.showErrorMsg(error);
    }
  };

  // Handle update hire request in both view and model
  handlerUpdateBorrowBooks = async (id, user, book, fromDate, toDate) => {
    try {
      const info = await
      this.hireRequestModel.updateBorrowBooks(id, user, book, fromDate, toDate);
      const updatedBook = await this.bookModel.updateBookQuantity(book);
      const userSelect = await this.userModel.updateUser(user);
      this.hireRequestView.updateBorrowBooksElement(info, userSelect, updatedBook);
      this.hireRequestView.bindSelectCombobox(userSelect, updatedBook);
      this.hireRequestView.showSuccessMsg(SUCCESS_MSG.MESSAGE_UPDATE_HIRE_REQUEST);
    } catch (error) {
      this.hireRequestView.showErrorMsg(error);
    }
  };

  // Handle complete hire request in both view and model
  handlerCompleteBorrowBooks = async (id, book) => {
    try {
      this.hireRequestModel.completeBorrowBooks(id, book);

      /**
       * Get data complete borrowbook from bookModel
       * Now the number of books will + 1
      */
      const updateBooks = await this.bookModel.updateCompleteBorrowBooks(book);
      const userSelect = await this.userModel.getUsers();
      const bookSelect = await this.bookModel.getBooks();
      this.hireRequestView.bindSelectCombobox(userSelect, bookSelect);
      this.hireRequestView.completeTaskElement(id, updateBooks);
      this.hireRequestView.showSuccessMsg(SUCCESS_MSG.MESSAGE_COMPLETE_HIRE_REQUEST);
    } catch (error) {
      this.hireRequestView.showErrorMsg(error);
    }
  };
}
