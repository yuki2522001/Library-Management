const VALIDATE_MSG = {
  REQUIRED: "This field is required",
  MESSAGE_EMAIL_FORMAT: "Email address empty or wrong format. example: username@somewhere.sth",
  MESSAGE_PHONE_FORMAT: "Phone is empty or wrong format. Start with: 03,05,07,08,09",
  MESSAGE_ADDRESS_FORMAT: "Address includes house number and street name",
  MESSAGE_NUMBER_FORMAT: "This field is required and Please enter number greater than 0",
  MESSAGE_COMPARE_NUMBER: "Available quantity must be less than total quantity",
  MESSAGE_HIRE_REQUEST_FROM_DATE: "From date must be current date",
  MESSAGE_HIRE_REQUEST_DATE: "Each book can only be hired for up to 10 days. </br> To date cannot be before from date",
  MESSAGE_HIRE_UP_BOOK: "Hired up to 5 book",
};

const SUCCESS_MSG = {
  MESSAGE_ADD_BOOK: "The book add successful",
  MESSAGE_UPDATE_BOOK: "The book update successful",
  MESSAGE_DELETE_BOOK: "The book delete successful",
  MESSAGE_ADD_USER: "The user add successful",
  MESSAGE_UPDATE_USER: "The user update successful",
  MESSAGE_DELETE_USER: "The user delete successful",
  MESSAGE_ADD_HIRE_REQUEST: "Hire request add successful",
  MESSAGE_UPDATE_HIRE_REQUEST: "Hire request update successful",
  MESSAGE_DELETE_HIRE_REQUEST: "Hire request delete successful",
  MESSAGE_COMPLETE_HIRE_REQUEST: "Complete hire request this book successful",
};

export { VALIDATE_MSG, SUCCESS_MSG };
