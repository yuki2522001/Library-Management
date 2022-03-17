/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from "uuid";
import { urlUser } from "../constants/apis";
import {
  get, post, remove, update,
} from "../helpers/fetchApi";

export default class UserModel {
  constructor() {
    this.userData = [];
  }

  // Get data from server
  async getUsers() {
    this.users = await get(urlUser);
    return this.users;
  }

  // Add books
  async addUser(dataUsers) {
    // Use uuid to render unique id
    const userId = uuidv4();
    const newUser = {
      id: userId,
      firstName: dataUsers.firstName,
      lastName: dataUsers.lastName,
      email: dataUsers.email,
      phone: dataUsers.phone,
      address: dataUsers.address,
    };

    const user = await post(urlUser, newUser);
    this.users.push(user);
    return user;
  }

  // Delete user
  deleteUser(id) {
    const url = `${urlUser}/${id}`;
    return remove(url);
  }

  // Update user
  async updateUser(id, dataUsers) {
    const updateUser = {
      id: dataUsers.id,
      firstName: dataUsers.firstName,
      lastName: dataUsers.lastName,
      email: dataUsers.email,
      phone: dataUsers.phone,
      address: dataUsers.address,
    };

    return update(`${urlUser}/${id}`, updateUser);
  }
}
