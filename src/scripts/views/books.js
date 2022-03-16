/* eslint-disable class-methods-use-this */
import { createElement } from "../helpers/dom";
import Toast from "../components/toast";

export default class BookView {
  constructor() {
    // Get task modal element
    this.taskModalElement = document.getElementById("taskModal");
    this.taskDeleteModal = document.getElementById("bookDeleteModal");

    // Get value and display content on body
    this.bookListElement = document.getElementById("books__body");

    // Get input value
    this.inputTile = document.getElementById("input__title");
    this.inputAuthor = document.getElementById("input__author");
    this.inputPrice = document.getElementById("input__price");
    this.inputAvailableQty = document.getElementById("input__availableQty");
    this.inputTotalQty = document.getElementById("input__totalQty");

    // Get button
    this.btnAdd = document.getElementById("addBook");
    this.btnUpdate = document.getElementById("updateBook");
    this.btnDelete = document.getElementById("btn__delete");
    this.btnSearch = document.getElementById("btn__search");
    this.btnOpen = document.getElementById("btnOpen");
    this.btnClose = document.getElementById("btnClose");
    this.btnCloseDeleteModel = document.getElementById("closeDeleteModal");
  }

  /**
   * Display validate message if input text value is empty
   *
   */
  checkBookTitleIsNotEmpty = (message) => {
    const msgBookTitleIsNotEmpty = document.getElementById("msgTitle");
    msgBookTitleIsNotEmpty.innerHTML = message;
  };

  checkAuthorIsNotEmpty = (message) => {
    const msgAuthorIsNotEmpty = document.getElementById("msgAuthor");
    msgAuthorIsNotEmpty.innerHTML = message;
  };

  checkFormatPrice = (message) => {
    const msgPriceIsNotEmptyAndNegative = document.getElementById("msgPrice");
    msgPriceIsNotEmptyAndNegative.innerHTML = message;
  };

  checkFormatTotalQty = (message) => {
    const msgTotalIsNotEmptyAndNegative = document.getElementById("msgTotal");
    msgTotalIsNotEmptyAndNegative.innerHTML = message;
  };

  checkFormatAvailableQty = (message) => {
    const msgAvailableIsNotEmptyAndNegative = document.getElementById("msgAvailable");
    msgAvailableIsNotEmptyAndNegative.innerHTML = message;
  };

  // Clear message
  clearValidateMsg = () => {
    document.querySelectorAll(".validate-message").forEach((value) => {
    // eslint-disable-next-line no-param-reassign
      value.innerHTML = "";
    });
  };

  // Show success message
  showSuccessMsg = (msg) => {
    Toast({
      title: "Success!",
      message: msg,
      type: "success",
    });
  };

  // Show error message
  showErrorMsg = (msg) => {
    Toast({
      title: "Error!",
      message: msg,
      type: "error",
    });
  };

  /**
   * Close task detail modal
   */
  closeTaskModal = () => {
    // closeModel("#taskModalCenter");
    this.taskModalElement.style.display = "none";
  };

  closeTaskDelete = () => {
    this.taskDeleteModal.style.display = "none";
  };

  /**
   * Open task detail modal
   */
  openTaskModal = () => {
    this.taskModalElement.style.display = "block";
  };

  openTaskDelete = () => {
    this.taskDeleteModal.style.display = "block";
  };

  // Reset form
  resetForm = () => {
    this.inputTile.value = "";
    this.inputAuthor.value = "";
    this.inputPrice.value = "";
    this.inputTotalQty.value = "";
    this.inputAvailableQty.value = "";
  };

  /* eslint-disable class-methods-use-this */
  createBookElement = (book) => {
    // Create a cell for displaying book title
    const titleElement = createElement("td", { className: "book__item", id: `book-title-${book.id}` }, `${book.title}`);
    // Create a cell for displaying author
    const authorElement = createElement("td", { className: "book__item", id: `book-author-${book.id}` }, `${book.author}`);
    // Create a cell for displaying price
    const priceElement = createElement("td", { className: "book__item", id: `book-price-${book.id}` }, `${book.price}`);
    // Create a cell for displaying total quantity
    const totalQtyElement = createElement("td", { className: "book__item", id: `book-totalQty-${book.id}` }, `${book.totalQty}`);
    // Create a cell for displaying available quantity
    const availableQtyElement = createElement("td", { className: "book__item", id: `book-available-${book.id}` }, `${book.availableQty}`);
    // Create a button for display update books
    const iconUpdate = createElement("i", { className: "btn__update fa fa-pen" }, "");
    const btnUpdate = createElement("button", { className: "btn__update" }, [iconUpdate]);
    iconUpdate.dataset.id = book.id;
    // Create a button for display delete books
    const iconDelete = createElement("i", { className: "btn__del fa fa-trash" }, "");
    const btnDel = createElement("button", { className: "btn__del" }, [iconDelete]);
    iconDelete.dataset.id = book.id;
    // Display two button on the cell
    const bookControl = createElement("td", { className: "book__item" }, [btnUpdate, btnDel]);
    // Create a row for displaying book item info
    const bookRow = createElement("tr", { className: "book__list", id: `${book.id}` }, [titleElement, authorElement, priceElement, totalQtyElement, availableQtyElement, bookControl]);

    return bookRow;
  };

  // Render book list
  renderBook(books) {
    this.bookData = books;
    // Create a task node for each task in book list
    books.forEach((book) => {
      const bookRow = this.createBookElement(book);
      // Append task row to the table
      this.bookListElement.append(bookRow);
    });
  }

  // Open task when click
  bindOpenTask() {
    const self = this;
    this.btnOpen.addEventListener("click", () => {
      self.openTaskModal();
      self.btnAdd.style.display = "block";
      self.btnUpdate.style.display = "none";
    });
  }

  // Close task when click
  bindCloseTask() {
    const self = this;
    this.btnClose.addEventListener("click", () => {
      self.resetForm();
      self.clearValidateMsg();
      self.closeTaskModal();
    });
  }

  // Close task delete model when click
  bindCloseDeleteModal() {
    const self = this;
    this.btnCloseDeleteModel.addEventListener("click", () => {
      self.closeTaskDelete();
    });
  }

  /**
   * Get the input data and pass it to callback handler in controller
   *
   * @param {callback} handler
  */
  bindAddBookElement(handler) {
    const self = this;
    this.btnAdd.addEventListener("click", (event) => {
      event.preventDefault();
      this.clearValidateMsg();

      handler(
        self.inputTile.value.trim(),
        self.inputAuthor.value.trim(),
        self.inputPrice.value.trim(),
        self.inputTotalQty.value.trim(),
        self.inputAvailableQty.value.trim(),
      );
    });
  }

  appendBook(newBook) {
    // Create a task row for displaying data of new task
    const newBookElement = this.createBookElement(newBook);
    this.bookListElement.append(newBookElement);
    this.resetForm();
    this.closeTaskModal();
  }

  // Display confirm delete modal
  bindConfirmDeleteBook() {
    const self = this;
    // Add event click from bookListElement
    this.bookListElement.addEventListener("click", (event) => {
      // Find the element whose className is btn__del
      if (event.target.className === "btn__del fa fa-trash") {
        const { id } = event.target.dataset;
        self.openTaskDelete();
        // Set id for model
        const modalDelete = document.getElementById("bookDeleteModal");
        modalDelete.dataset.id = id;
      }
    });
  }

  // Delete book element
  bindDeleteBookElement(handle) {
    this.btnDelete.addEventListener("click", () => {
      const modalDelete = document.getElementById("bookDeleteModal");
      const { id } = modalDelete.dataset;
      handle(id);
    });
  }

  deleteBookElement(id) {
    // Get the id of target element
    const bookElement = document.getElementById(id);
    bookElement.remove();
    this.closeTaskDelete();
  }

  // Display data on modal
  bindDisplayBookOnModal() {
    const self = this;
    this.bookListElement.addEventListener("click", (event) => {
      if (event.target.className === "btn__update fa fa-pen") {
        const { id } = event.target.dataset;
        const currentBook = this.bookData.find((item) => item.id === id);

        if (currentBook) {
          self.openTaskModal();
          self.btnAdd.style.display = "none";
          self.btnUpdate.style.display = "block";

          // Get value and display on modal
          document.getElementById("input__title").value = currentBook.title;
          document.getElementById("input__author").value = currentBook.author;
          document.getElementById("input__price").value = currentBook.price;
          document.getElementById("input__totalQty").value = currentBook.totalQty;
          document.getElementById("input__availableQty").value = currentBook.availableQty;

          const modal = document.getElementById("taskModal");
          modal.dataset.id = id;
        }
      }
    });
  }

  bindUpdateBook(handle) {
    const self = this;
    this.btnUpdate.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.getElementById("taskModal");
      const { id } = modal.dataset;

      handle(
        id,
        self.inputTile.value.trim(),
        self.inputAuthor.value.trim(),
        self.inputPrice.value.trim(),
        self.inputTotalQty.value.trim(),
        self.inputAvailableQty.value.trim(),
      );
    });
  }

  updateBookElement(book) {
    const bookTitleElement = document.getElementById(`book-title-${book.id}`);
    bookTitleElement.innerHTML = `${book.title}`;

    const bookAuthorElement = document.getElementById(`book-author-${book.id}`);
    bookAuthorElement.innerHTML = `${book.author}`;

    const bookPriceElement = document.getElementById(`book-price-${book.id}`);
    bookPriceElement.innerHTML = `${book.price}`;

    const bookTotalElement = document.getElementById(`book-totalQty-${book.id}`);
    bookTotalElement.innerHTML = `${book.totalQty}`;

    const bookAvailableTitleElement = document.getElementById(`book-available-${book.id}`);
    bookAvailableTitleElement.innerHTML = `${book.availableQty}`;

    this.resetForm();
    this.closeTaskModal();
  }
}
