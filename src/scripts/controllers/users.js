import { VALIDATE_MSG, SUCCESS_MSG } from "../constants/message";
import {
  isRequired, isFormatEmail, isFormatPhone, isFormatAddress,
} from "../helpers/validation";

export default class UserController {
  constructor(userModel, userView) {
    this.userModel = userModel;
    this.userView = userView;
  }

  // Call handler from hire request view
  callViewUserHandle() {
    this.getUsers();
    this.userView.bindOpenTask();
    this.userView.bindCloseTask();
    this.userView.bindCloseDeleteModal();
    this.userView.bindConfirmDeleteUser();
    this.userView.bindDisplayUserOnModal();
    this.userView.bindAddUserElement(this.handlerAddUser);
    this.userView.bindDeleteUserElement(this.handlerDeleteUser);
    this.userView.bindUpdateUser(this.handlerUpdateUser);
  }

  // Display data on dom
  getUsers = async () => {
    this.userModel.userData = await this.userModel.getUsers();
    // Render user list
    this.userView.renderUser(this.userModel.userData);
  };

  // Handle add user in both view and model
  handlerAddUser = async (firstName, lastName, email, phone, address) => {
    /**
     * Display validate message if input text value is empty
    */
    if (!isRequired(firstName)) {
      this.userView.checkFirstNameIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    if (!isRequired(lastName)) {
      this.userView.checkLastNameIsNotEmpty(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if input email value is empty
    */
    if (!isRequired(email)) {
      this.userView.checkFormatEmail(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if email is malformed
    */
    if (!isFormatEmail(email)) {
      this.userView.checkFormatEmail(VALIDATE_MSG.MESSAGE_EMAIL_FORMAT);
      return;
    }

    /**
     * Display validate message if input phone value is empty
    */
    if (!isRequired(phone)) {
      this.userView.checkFormatPhone(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if phone is malformed
    */
    if (!isFormatPhone(phone)) {
      this.userView.checkFormatPhone(VALIDATE_MSG.MESSAGE_PHONE_FORMAT);
      return;
    }

    /**
     * Display validate message if input address value is empty
    */
    if (!isRequired(address)) {
      this.userView.checkFormatAddress(VALIDATE_MSG.REQUIRED);
      return;
    }

    /**
     * Display validate message if address is malformed
    */
    if (!isFormatAddress(address)) {
      this.userView.checkFormatAddress(VALIDATE_MSG.MESSAGE_ADDRESS_FORMAT);
      return;
    }

    try {
      const newUser = await this.userModel.addUser(firstName, lastName, email, phone, address);
      this.userView.appendUser(newUser);
      this.userView.showSuccessMsg(SUCCESS_MSG.MESSAGE_ADD_USER);
    } catch (err) {
      this.userView.showErrorMsg(err);
    }
  };

  // Handle delete user in both view and model
  handlerDeleteUser = async (id) => {
    try {
      this.userModel.deleteUser(id);
      this.userView.deleteUserElement(id);
      this.userView.showSuccessMsg(SUCCESS_MSG.MESSAGE_DELETE_USER);
    } catch (error) {
      this.userView.showErrorMsg(error);
    }
  };

  // Handle update user in both view and model
  handlerUpdateUser = async (id, firstName, lastName, email, phone, address) => {
    try {
      const user = await this.userModel.updateUser(id, firstName, lastName, email, phone, address);
      this.userView.updateUserElement(user);
      this.userView.showSuccessMsg(SUCCESS_MSG.MESSAGE_UPDATE_USER);
    } catch (error) {
      this.userView.showErrorMsg(error);
    }
  };
}
