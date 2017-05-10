const help = require('../index');

describe('dateOrder', () => {
  it('Sorts date strings in descending order', () => {
    const dates = [
      'Oct 7, 2009', 'Nov 10, 2009', 'Jan 10, 2009', 'Oct 22, 2009',
      'Oct 21 2010', 'Jan 09 2011', 'Dec 10 2008',
    ];
    const datesSortedDescending = [
      'Dec 10 2008', 'Jan 10, 2009', 'Oct 7, 2009', 'Oct 22, 2009',
      'Nov 10, 2009', 'Oct 21 2010', 'Jan 09 2011',
    ];

    expect(help.orderDatesDescending(dates)).toEqual(datesSortedDescending);
  });
});
