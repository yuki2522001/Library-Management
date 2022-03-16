/* eslint-disable class-methods-use-this */
export default class CardView {
  // Display number of book on card
  displayBooks(book) {
    const displayDataBook = document.getElementById("text-data");
    displayDataBook.innerHTML = book.length;
  }

  // Display number of user on card
  displayUsers(user) {
    const displayDataUser = document.getElementById("text-UserData");
    displayDataUser.innerHTML = user.length;
  }

  // Display number of complete hire request
  displayDataCompletes(count) {
    const displayDataComplete = document.getElementById("text-dataComplete");
    displayDataComplete.innerHTML = count;
  }
}
