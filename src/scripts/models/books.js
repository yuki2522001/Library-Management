/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from "uuid";
import { urlBook } from "../constants/apis";
import {
  get, post, remove, update,
} from "../helpers/fetchApi";

export default class BookModel {
  constructor() {
    this.bookData = [];
  }

  // Get data from server
  async getBooks() {
    this.books = await get(urlBook);
    return this.books;
  }

  // Add new book
  async addBook(dataBooks) {
    // Use uuid to render unique id
    const bookId = uuidv4();
    const newBook = {
      id: bookId,
      title: dataBooks.title,
      author: dataBooks.author,
      price: Number(dataBooks.price),
      totalQty: Number(dataBooks.totalQty),
      availableQty: Number(dataBooks.availableQty),
    };

    const book = await post(urlBook, newBook);
    this.books.push(book);
    return book;
  }

  // Update available quantity after borrowing books
  async updateBookQuantity(id) {
    const book = await get(`${urlBook}/${id}`);
    book.availableQty -= 1;
    const afterBook = await update(`${urlBook}/${id}`, book);
    this.books = afterBook;
    return update(`${urlBook}/${id}`, book);
  }

  // Update available quantity after complete hire request books
  async updateCompleteBorrowBooks(id) {
    const book = await get(`${urlBook}/${id}`);
    book.availableQty += 1;
    return update(`${urlBook}/${id}`, book);
  }

  // Delete book
  deleteBook(id) {
    const url = `${urlBook}/${id}`;
    return remove(url);
  }

  // Update book
  async updateBook(id, dataBooks) {
    const updateBook = {
      id: dataBooks.id,
      title: dataBooks.title,
      author: dataBooks.author,
      price: Number(dataBooks.price),
      totalQty: Number(dataBooks.totalQty),
      availableQty: Number(dataBooks.availableQty),
    };
    return update(`${urlBook}/${id}`, updateBook);
  }
}
