/**
 * Sorts in descending order an array of formatted strings representing dates
 * @param {Array} dates datestrings with format 'Oct 7, 2009', 'Oct 18, 2009'
 * @returns {Array} a new array of input datestrings, in descending order
 */
const orderDatesDescending = (dates) => {
  const monthNumbers = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  return dates.sort((dateA, dateB) => {
    const dateObjects = [dateA, dateB].map((date) => {
      const dateArray = date.replace(/,/g, '')
        .toLowerCase()
        .split(' ');
      return ({
        month: monthNumbers[dateArray[0]],
        day: parseInt(dateArray[1], 10),
        year: parseInt(dateArray[2], 10),
      });
    });
    const dateAObject = dateObjects[0];
    const dateBObject = dateObjects[1];

    if (dateAObject.year === dateBObject.year) {
      return (dateAObject.month === dateBObject.month
        ? dateAObject.day - dateBObject.day
        : dateAObject.month - dateBObject.month
      );
    }

    return dateAObject.year - dateBObject.year;
  });
};

module.exports = { orderDatesDescending };
