/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
import { createElement } from "../helpers/dom";
import { TODAY, calculateDayNumber } from "../helpers/date";
import Toast from "../components/toast";

export default class HireRequestView {
  constructor() {
    // Get value and display content on body
    this.infoListElement = document.getElementById("hires__body");

    // Get task modal element
    this.taskModalElement = document.getElementById("taskModal");
    this.taskDeleteModal = document.getElementById("hireRequestDeleteModal");
    this.taskCompleteModal = document.getElementById("hireRequestCompleteModal");

    // Get input value
    this.inputUser = document.getElementById("hire-select-user");
    this.inputBook = document.getElementById("hire-select-book");
    this.inputFromDate = document.getElementById("input-fromDate");
    this.inputToDate = document.getElementById("input-toDate");

    // Get button
    this.btnAddInfo = document.getElementById("addInfos");
    this.btnUpdateInfo = document.getElementById("updateInfos");
    this.btnDeleteHireRequest = document.getElementById("btn-deleteHireRequest");
    this.btnCompleteHireRequest = document.getElementById("btn-completeHireRequest");

    this.btnOpen = document.getElementById("btnOpen");
    this.btnClose = document.getElementById("btnClose");
    this.btnCloseDeleteModel = document.getElementById("closeDeleteModal");
    this.btnCloseCompleteHireRequest = document.getElementById("closeHireRequestModal");
  }

  /**
   * Display validate message if input text value is empty
   *
   */
  checkUserNameIsNotEmpty = (message) => {
    const msgUserNameIsNotEmpty = document.getElementById("msgUserName");
    msgUserNameIsNotEmpty.innerHTML = message;
  };

  checkBookIsNotEmpty = (message) => {
    const msgBookIsNotEmpty = document.getElementById("msgBook");
    msgBookIsNotEmpty.innerHTML = message;
  };

  checkToDate = (message) => {
    const msgToDateIsNotEmpty = document.getElementById("msgToDate");
    msgToDateIsNotEmpty.innerHTML = message;
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
    this.taskModalElement.style.display = "none";
  };

  closeTaskDelete = () => {
    this.taskDeleteModal.style.display = "none";
  };

  closeTaskComplete = () => {
    this.taskCompleteModal.style.display = "none";
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

  openTaskComplete = () => {
    this.taskCompleteModal.style.display = "block";
  };

  // Reset form
  resetForm = () => {
    this.inputToDate.value = "";
  };

  createHireRequestElement = (info, user, book) => {
    const userElement = createElement("td", { className: "info__item", id: `info-user-${info.id}` }, `${user && user.firstName} ${user && user.lastName}`);
    // Create a cell for displaying email
    const InfoElement = createElement("td", { className: "info__item", id: `info-book-${info.id}` }, `${book && book.title}`);
    // Create a cell for displaying available quantity
    const fromDateElement = createElement("td", { className: "info__item", id: `info-fromDate-${info.id}` }, `${info.fromDate}`);
    // Create a cell for displaying total quantity
    const toDateElement = createElement("td", { className: "info__item", id: `info-toDate-${info.id}` }, `${info.toDate}`);

    // Create a cell for displaying due date
    const dueDateText = createElement("td", { className: "info__item", id: `due-date-${info.id}` }, this.generateDueDateText(info));
    this.highlightDueDateLabel(info, dueDateText);

    // Create a button for display update infos
    const iconUpdate = createElement("i", { className: "btn__update fa fa-pen" }, "");
    const btnUpdate = createElement("button", { className: "btn__update" }, [iconUpdate]);
    iconUpdate.dataset.id = info.id;
    // Create a button for display delete infos
    const iconDelete = createElement("i", { className: "btn__del fa fa-trash" }, "");
    const btnDel = createElement("button", { className: "btn__del" }, [iconDelete]);
    iconDelete.dataset.id = info.id;
    // Create a button for display complete infos
    const iconComplete = createElement("i", { className: "btn__complete fa fa-check" }, "");
    const btnComplete = createElement("button", { className: "btn__complete" }, [iconComplete]);
    iconComplete.dataset.id = info.id;
    const completeMessage = createElement("span", { className: "item__complete" }, "Complete");
    // Display two button on the cell
    const infoControl = createElement("td", { className: "info__item", id: `task-control-${info.id}` }, !info.isComplete ? [btnUpdate, btnComplete] : [completeMessage, btnDel]);
    // Create a row for displaying info item info
    const infoRow = createElement("tr", { className: "info__list", id: `${info.id}` }, [userElement, InfoElement, fromDateElement, toDateElement, dueDateText, infoControl]);

    return infoRow;
  };

  async renderHireRequest(infos, users, books) {
    this.infoData = infos;

    infos.forEach((info) => {
      // When have this.books, then search by id, otherwise it will return an empty object
      const user = (users && users.find((element) => element.id === info.user)) || {};
      const book = (books && books.find((element) => element.id === info.book)) || {};

      const infoRow = this.createHireRequestElement(info, user, book);
      this.infoListElement.append(infoRow);
    });
  }

  // Open task when click
  bindOpenTask() {
    const self = this;
    this.btnOpen.addEventListener("click", () => {
      this.openTaskModal();
      // Get current date
      const utc = new Date().toJSON().slice(0, 10);
      self.inputFromDate.value = utc;
      self.btnAddInfo.style.display = "block";
      self.btnUpdateInfo.style.display = "none";
    });
  }

  // Close task when click
  bindCloseTask() {
    const self = this;
    this.btnClose.addEventListener("click", () => {
      self.closeTaskModal();
      self.clearValidateMsg();
    });
  }

  // Close task delete when click
  bindCloseDeleteModal() {
    const self = this;
    this.btnCloseDeleteModel.addEventListener("click", () => {
      self.closeTaskDelete();
      self.clearValidateMsg();
    });
  }

  // Close task hire request when click
  bindCloseHireRequest() {
    const self = this;
    this.btnCloseCompleteHireRequest.addEventListener("click", () => {
      self.closeTaskComplete();
      self.clearValidateMsg();
    });
  }

  // Display data on combobox
  async bindSelectCombobox(users, books) {
    // Use map to render and get data put on tag option
    const strOption = users.map((item) => `<option value="${item.id}">${item.firstName} ${item.lastName}</option>`);
    const selectUser = document.getElementById("hire-select-user");
    selectUser.innerHTML = strOption;

    /**
     * If available = 0, then hide that book
    */
    const strBookOption = books.map((item) => (!item.availableQty == 0
      ? `<option value="${item.id}">${item.title}</option>` : ""));
    const selectBook = document.getElementById("hire-select-book");
    selectBook.innerHTML = strBookOption;
  }

  generateDueDateText(info) {
    const days = calculateDayNumber(TODAY, info.toDate);

    /**
     * days >= 0 it will tell me how many days are left,
     * and if I am overdue, it will print Overdue ${Math.abs(days)} days.
    */
    return (days >= 0 ? `${days} days left` : `Overdue ${Math.abs(days)} days`);
  }

  highlightDueDateLabel(info, label) {
    const dueDateLabel = document.getElementById(`due-date-${info.id}`) || label;
    const days = calculateDayNumber(TODAY, info.toDate);

    /* If the time is about to overdue the text is highlighted in red */
    if (days <= 3) {
      dueDateLabel.style.color = "red";
      return;
    }

    dueDateLabel.style.color = "green";
  }

  /**
   * Get the input data and pass it to callback handler in controller
   *
   * @param {callback} handler
   */
  bindAddBorrowBooksElement(handler) {
    const self = this;
    this.btnAddInfo.addEventListener("click", (event) => {
      event.preventDefault();
      this.clearValidateMsg();

      handler(
        self.inputUser.value.trim(),
        self.inputBook.value.trim(),
        self.inputFromDate.value.trim(),
        self.inputToDate.value.trim(),
      );
    });
  }

  appendBorrowBooks(info, user, book) {
    const newInfoElement = this.createHireRequestElement(info, user, book);
    this.infoListElement.append(newInfoElement);
    this.resetForm();
    this.closeTaskModal();
  }

  bindConfirmDeleteHireRequest() {
    const self = this;
    this.infoListElement.addEventListener("click", (event) => {
      if (event.target.className === "btn__del fa fa-trash") {
        const { id } = event.target.dataset;
        self.openTaskDelete();
        const modalDelete = document.getElementById("hireRequestDeleteModal");
        modalDelete.dataset.id = id;
      }
    });
  }

  /**
   * Get the id and pass it to callback handler in controller
   *
   * @param {callback} handler
   */
  bindDeleteBorrowBooksElement(handle) {
    this.btnDeleteHireRequest.addEventListener("click", () => {
      const modalDeleteUser = document.getElementById("hireRequestDeleteModal");
      const { id } = modalDeleteUser.dataset;
      handle(id);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  deleteBorrowBooksElement(id) {
    // Get the id of target element
    const infoElement = document.getElementById(id);
    infoElement.remove();
    this.closeTaskDelete();
  }

  /**
   * Find the element by id and then display the value on modal
   */
  bindDisplayBorrowBooksOnModal() {
    const self = this;
    this.infoListElement.addEventListener("click", (event) => {
      if (event.target.className === "btn__update fa fa-pen") {
        const { id } = event.target.dataset;
        const currentBook = this.infoData.find((item) => item.id === id);

        if (currentBook) {
          self.openTaskModal();
          self.btnUpdateInfo.style.display = "block";
          self.btnAddInfo.style.display = "none";

          document.getElementById("hire-select-user").value = currentBook.user;
          document.getElementById("hire-select-book").value = currentBook.book;
          document.getElementById("input-fromDate").value = currentBook.fromDate;
          document.getElementById("input-toDate").value = currentBook.toDate;

          const modal = document.getElementById("taskModal");
          modal.dataset.id = id;
        }
      }
    });
  }

  /**
   * Get the input data and pass it to callback handler in controller
   *
   * @param {callback} handler
   */
  bindUpdateBorrowBooks(handle) {
    const self = this;
    this.btnUpdateInfo.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.getElementById("taskModal");
      const { id } = modal.dataset;
      handle(
        id,
        self.inputUser.value.trim(),
        self.inputBook.value.trim(),
        self.inputFromDate.value.trim(),
        self.inputToDate.value.trim(),
      );
    });
  }

  // Display the value on dom
  updateBorrowBooksElement(info, users, books) {
    const task = document.getElementById(`due-date-${info.id}`);
    task.innerHTML = this.generateDueDateText(info);

    const infoUserElement = document.getElementById(`info-user-${info.id}`);
    infoUserElement.innerHTML = `${users.firstName} ${users.lastName}`;

    const infoBookElement = document.getElementById(`info-book-${info.id}`);
    infoBookElement.innerHTML = `${books.title}`;

    const infoFromDateElement = document.getElementById(`info-fromDate-${info.id}`);
    infoFromDateElement.innerHTML = `${info.fromDate}`;

    const infoToDateElement = document.getElementById(`info-toDate-${info.id}`);
    infoToDateElement.innerHTML = `${info.toDate}`;

    this.resetForm();
    this.closeTaskModal();
    this.highlightDueDateLabel(info, task);
  }

  // Bind confirm complete books
  bindConfirmCompleteBorrowBooksElement() {
    const self = this;
    this.infoListElement.addEventListener("click", (event) => {
      if (event.target.className === "btn__complete fa fa-check") {
        const { id } = event.target.dataset;
        const currentBook = this.infoData.find((item) => item.id === id);

        if (currentBook) {
          self.openTaskComplete();
          document.getElementById("hire-select-book").value = currentBook.book;
          const modalCompleteHireRequest = document.getElementById("hireRequestCompleteModal");
          modalCompleteHireRequest.dataset.id = id;
        }
      }
    });
  }

  // Bind complete borrow books
  bindCompleteBorrowBooksElement(handle) {
    this.btnCompleteHireRequest.addEventListener("click", (event) => {
      event.preventDefault();
      const modalCompleteHireRequest = document.getElementById("hireRequestCompleteModal");
      const { id } = modalCompleteHireRequest.dataset;
      const currentBook = this.infoData.find((item) => item.id === id);
      handle(
        id,
        currentBook.book,
      );
    });
  }

  completeTaskElement(id) {
    const taskControlElement = document.getElementById(`task-control-${id}`);
    const row = document.getElementById(id); // <tr>
    const btnComplete = row.querySelector(".btn__complete"); // button complete
    btnComplete.remove();

    const btnUpdate = row.querySelector(".btn__update"); // button update
    btnUpdate.remove();

    const iconDelete = createElement("i", { className: "btn__del fa fa-trash" }, "");
    const btnDelete = createElement("button", { className: "btn__del" }, [iconDelete]);
    iconDelete.dataset.id = id;
    const completeMessage = createElement("span", { className: "item__complete" }, "Complete");

    taskControlElement.prepend(completeMessage, btnDelete);
    this.closeTaskComplete();
  }
}
