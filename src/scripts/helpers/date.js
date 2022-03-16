const TODAY = new Date();

const calculateDayNumber = (startDate, endDate) => {
  /**
   * Calculate days between due date and current day
   * The result of dueDate in milliseconds so we have to
   * 1 seconds = 1000 milliseconds
   * divide (1000 milliseconds _ (60 minutes _ 60 seconds) * 24 hours) to convert to days;
   */
  const dueDate = new Date(endDate).getTime() - startDate.getTime();
  // Math.ceil: rounds a number up to the next largest integer
  return Math.ceil(dueDate / (1000 * 3600 * 24));
};

export {
  TODAY,
  calculateDayNumber,
};
