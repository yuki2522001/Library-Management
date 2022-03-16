/* eslint-disable class-methods-use-this */
import { createElement } from "../helpers/dom";
import Toast from "../components/toast";

export default class UserView {
  constructor() {
    // Get value and display content on body
    this.userListElement = document.getElementById("users__body");

    // Get delete task modal
    this.taskDeleteModal = document.getElementById("userDeleteModal");

    // Get input value
    this.inputFirstName = document.getElementById("input-firstName");
    this.inputLastName = document.getElementById("input-lastName");
    this.inputEmail = document.getElementById("input-email");
    this.inputPhone = document.getElementById("input-phone");
    this.inputAddress = document.getElementById("input-address");

    // Get button
    this.btnAddUser = document.getElementById("btnAddUser");
    this.btnUpdate = document.getElementById("updateUser");
    this.btnDelete = document.getElementById("btn-deleteUser");
    this.taskModalElement = document.getElementById("taskModal");
    this.btnOpen = document.getElementById("btnOpen");
    this.btnClose = document.getElementById("btnClose");
    this.btnCloseDeleteModel = document.getElementById("closeDeleteModal");
  }

  /**
   * Display validate message if input text value is empty and format
   *
   */
  checkFirstNameIsNotEmpty = (message) => {
    const msgFirstNameIsNotEmpty = document.getElementById("msgFirstName");
    msgFirstNameIsNotEmpty.innerHTML = message;
  };

  checkLastNameIsNotEmpty = (message) => {
    const msgLastNameIsNotEmpty = document.getElementById("msgLastName");
    msgLastNameIsNotEmpty.innerHTML = message;
  };

  checkFormatEmail = (message) => {
    const msgEmailIsNotEmptyAndFormatEmail = document.getElementById("msgEmail");
    msgEmailIsNotEmptyAndFormatEmail.innerHTML = message;
  };

  checkFormatPhone = (message) => {
    const msgPhoneIsNotEmptyAndFormatPhone = document.getElementById("msgPhone");
    msgPhoneIsNotEmptyAndFormatPhone.innerHTML = message;
  };

  checkFormatAddress = (message) => {
    const msgAddressIsNotEmptyAndFormatAddress = document.getElementById("msgAddress");
    msgAddressIsNotEmptyAndFormatAddress.innerHTML = message;
  };

  // Clear validate message
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
    this.inputFirstName.value = "";
    this.inputLastName.value = "";
    this.inputEmail.value = "";
    this.inputPhone.value = "";
    this.inputAddress.value = "";
  };

  // eslint-disable-next-line class-methods-use-this
  createUserElement = (user) => {
    // Create a cell for displaying user firstName
    const firstNameElement = createElement("td", { className: "user__item", id: `user-firstName-${user.id}` }, `${user.firstName}`);
    // Create a cell for displaying lastName
    const lastNameElement = createElement("td", { className: "user__item", id: `user-lastName-${user.id}` }, `${user.lastName}`);
    // Create a cell for displaying email
    const emailElement = createElement("td", { className: "user__item", id: `user-email-${user.id}` }, `${user.email}`);
    // Create a cell for displaying available quantity
    const phoneElement = createElement("td", { className: "user__item", id: `user-phone-${user.id}` }, `${user.phone}`);
    // Create a cell for displaying total quantity
    const addressElement = createElement("td", { className: "user__item", id: `user-address-${user.id}` }, `${user.address}`);
    // Create a button for display update users
    const iconUpdate = createElement("i", { className: "btn__update fa fa-pen" }, "");
    const btnUpdate = createElement("button", { className: "btn__update" }, [iconUpdate]);
    iconUpdate.dataset.id = user.id;
    // Create a button for display delete users
    const iconDelete = createElement("i", { className: "btn__del fa fa-trash" }, "");
    const btnDel = createElement("button", { className: "btn__del" }, [iconDelete]);
    iconDelete.dataset.id = user.id;
    // Display two button on the cell
    const userControl = createElement("td", { className: "user__item" }, [btnUpdate, btnDel]);
    // Create a row for displaying user item info
    const userRow = createElement("tr", { className: "user__list", id: `${user.id}` }, [firstNameElement, lastNameElement, emailElement, phoneElement, addressElement, userControl]);
    return userRow;
  };

  // Render user list
  renderUser(users) {
    this.userData = users;
    users.forEach((user) => {
      const userRow = this.createUserElement(user);
      this.userListElement.append(userRow);
    });
  }

  // Open task when click
  bindOpenTask() {
    const self = this;
    this.btnOpen.addEventListener("click", () => {
      self.openTaskModal();
      self.btnAddUser.style.display = "block";
      self.btnUpdate.style.display = "none";
    });
  }

  // Close task when click
  bindCloseTask() {
    const self = this;
    this.btnClose.addEventListener("click", () => {
      self.closeTaskModal();
      self.clearValidateMsg();
      self.resetForm();
    });
  }

  // Close delete modal
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
  bindAddUserElement(handler) {
    const self = this;
    this.btnAddUser.addEventListener("click", (event) => {
      event.preventDefault();
      this.clearValidateMsg();
      handler(
        self.inputFirstName.value.trim(),
        self.inputLastName.value.trim(),
        self.inputEmail.value.trim(),
        self.inputPhone.value.trim(),
        self.inputAddress.value.trim(),
      );
    });
  }

  appendUser(newUser) {
    // Create a task row for displaying data of new task
    const newUserElement = this.createUserElement(newUser);
    this.userListElement.append(newUserElement);
    this.resetForm();
    this.closeTaskModal();
  }

  bindConfirmDeleteUser() {
    const self = this;
    // Add event click from userListElement
    this.userListElement.addEventListener("click", (event) => {
      // Find the element whose className is btn__del
      if (event.target.className === "btn__del fa fa-trash") {
        const { id } = event.target.dataset;
        self.openTaskDelete();
        const modalDelete = document.getElementById("userDeleteModal");
        modalDelete.dataset.id = id;
      }
    });
  }

  bindDeleteUserElement(handle) {
    this.btnDelete.addEventListener("click", (event) => {
      event.preventDefault();
      const modalDeleteUser = document.getElementById("userDeleteModal");
      const { id } = modalDeleteUser.dataset;
      handle(id);
    });
  }

  deleteUserElement(id) {
    const userElement = document.getElementById(id);
    userElement.remove();
    this.closeTaskDelete();
  }

  /**
   * Find the element by id and then display the value on modal
   */
  bindDisplayUserOnModal() {
    const self = this;
    this.userListElement.addEventListener("click", (event) => {
      if (event.target.className === "btn__update fa fa-pen") {
        const { id } = event.target.dataset;
        const currentUser = this.userData.find((item) => item.id === id);
        if (currentUser) {
          self.openTaskModal();
          self.btnAddUser.style.display = "none";
          self.btnUpdate.style.display = "block";

          document.getElementById("input-firstName").value = currentUser.firstName;
          document.getElementById("input-lastName").value = currentUser.lastName;
          document.getElementById("input-email").value = currentUser.email;
          document.getElementById("input-phone").value = currentUser.phone;
          document.getElementById("input-address").value = currentUser.address;

          const modal = document.getElementById("taskModal");
          modal.dataset.id = id;
        }
      }
    });
  }

  bindUpdateUser(handle) {
    const self = this;
    this.btnUpdate.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.getElementById("taskModal");
      const { id } = modal.dataset;
      handle(
        id,
        self.inputFirstName.value.trim(),
        self.inputLastName.value.trim(),
        self.inputEmail.value.trim(),
        self.inputPhone.value.trim(),
        self.inputAddress.value.trim(),
      );
    });
  }

  updateUserElement(user) {
    const userFirstNameElement = document.getElementById(`user-firstName-${user.id}`);
    userFirstNameElement.innerHTML = `${user.firstName}`;
    const userLastNameElement = document.getElementById(`user-lastName-${user.id}`);
    userLastNameElement.innerHTML = `${user.lastName}`;
    const userEmailElement = document.getElementById(`user-email-${user.id}`);
    userEmailElement.innerHTML = `${user.email}`;
    const userPhoneElement = document.getElementById(`user-phone-${user.id}`);
    userPhoneElement.innerHTML = `${user.phone}`;
    const userAddressElement = document.getElementById(`user-address-${user.id}`);
    userAddressElement.innerHTML = `${user.address}`;
    this.resetForm();
    this.closeTaskModal();
  }
}
