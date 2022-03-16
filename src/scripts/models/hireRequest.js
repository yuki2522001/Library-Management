/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from "uuid";
import { urlHire } from "../constants/apis";
import {
  get, post, remove, update,
} from "../helpers/fetchApi";
// import BookModel from "./booksModel";

export default class HireRequestModel {
  constructor() {
    this.hireRequestData = [];
  }

  // Get data from server
  async getHireRequest() {
    this.infos = await get(urlHire);
    return this.infos;
  }

  // Add information hire request
  async addBorrowBooks(user, book, fromDate, toDate, isComplete = false) {
    // Use uuid to render unique id
    const infoId = uuidv4();
    const newInfo = {
      id: infoId,
      user,
      book,
      fromDate,
      toDate,
      isComplete,
    };

    /**
     * Check how many books that user has borrowed,
     * if they borrow more than 5, they won't lend them anymore
    */
    let countUserHireRequest = 0;
    for (let i = 0; i < this.infos.length; i += 1) {
      if (this.infos[i].user === user && this.infos[i].isComplete === false) {
        countUserHireRequest += 1;
        if (countUserHireRequest >= 5) {
          return {
            data: null,
            status: 400,
          };
        }
      }
    }

    const info = await post(`${urlHire}`, newInfo);
    this.infos.push(info);
    return {
      data: info,
      status: 200,
    };
  }

  // Delete borrow book
  deleteBorrowBooks(id) {
    const url = `${urlHire}/${id}`;
    return remove(url);
  }

  // Update borrow books
  async updateBorrowBooks(id, user, book, fromDate, toDate) {
    const updateInfos = {
      id,
      user,
      book,
      fromDate,
      toDate,
    };

    return update(`${urlHire}/${id}`, updateInfos);
  }

  // Complete borrow books
  async completeBorrowBooks(id) {
    const url = await get(`${urlHire}/${id}`);
    url.isComplete = true;

    const hireRequest = await update(`${urlHire}/${id}`, url);
    const afterCompleteHireRequest = await this.infos.find((item) => item.id === hireRequest.id);
    if (afterCompleteHireRequest.isComplete === false) {
      afterCompleteHireRequest.isComplete = true;
    }

    return afterCompleteHireRequest;
  }

  // Count the number of completed hire requests
  async displayDataCompletes() {
    const dataComplete = await get(urlHire);
    let count = 0;
    for (let i = 0; i < dataComplete.length; i += 1) {
      if (dataComplete[i].isComplete === true) {
        count += 1;
      }
    }

    return count;
  }
}
