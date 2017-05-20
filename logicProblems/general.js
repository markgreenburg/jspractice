/**
Suppose we could access yesterday's stock prices as an array, where:

The values are the price in dollars of Apple stock.
A higher index indicates a later time.
So if the stock cost $500 at 10:30am and $550 at 11:00am, then:

stockPricesYesterday[60] = 500;

Write an efficient function that takes stockPricesYesterday and returns the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday.
No "shorting"—you must buy before you sell. You may not buy and sell in the same time step (at least 1 minute must pass).
 */

const getMaxProfit = (stockArray) => {

  // Ensure input exists and has at least two prices to evaluate
  if (typeof stockArray === "undefined"
    || !Array.isArray(stockArray)
    || stockArray.length < 2) {
    throw new Error("need at least two prices passed as an array");
  }

  // Initialize min price
  let minPrice = stockArray[0];

  // Initialize profit
  let bestProfit = stockArray[1] - minPrice;

  // Iterate through array
  stockArray.forEach((currentPrice, index) => {

    // Skip first position in index...can't buy and sell at same time
    if (index === 0) { return }

    // Calculate profit as current price - min price
    potentialProfit = currentPrice - minPrice;

    // If greater than current price, replace
    bestProfit = Math.max(bestProfit, potentialProfit);

    // Check if the current price is lower than the known best price
    minPrice = Math.min(minPrice, currentPrice);
  });

  // Return greatest profit
  return bestProfit;
}

/**
You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.
Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of integers and returns an array of the products.

Do not use division in your solution.
 */

// Using Greedy approach...
const getAllProductsExceptIndex = (inputArray) => {

  // Ensure input integrity
  if (typeof inputArray === "undefined"
    || !Array.isArray(inputArray)
    || inputArray.length < 2) {
    throw new Error("Must provide an array of at least two numbers");
  }

  // Initialize the final products array
  let productsWithoutIndex = [];

  // Initialize product to 1
  let productSoFar = 1;

  // Loop through the input and calculate the products of all numbers before
  // each index
  inputArray.forEach((value) => {

    // Check that a number input was provided
    if (typeof value !== "number") {
      throw new Error("All inputs must be numbers!");
    }

    // Save the calculated product to the final products array
    productsWithoutIndex = [...productsWithoutIndex, productSoFar];

    // Multiply the current product with the current index's value
    productSoFar *= value;
  });

  // Do same as above but in reverse order to get products of all numbers
  // after each index
  productSoFar = 1;

  for (let i = inputArray.length - 1; i >= 0; i--) {

    // Mutate the final product array with the after-index product
    productsWithoutIndex[i] *= productSoFar;
    // Multiply afterIndex product by current index
    productSoFar *= inputArray[i];
  }

  return productsWithoutIndex;
}

/**
Given an array of integers, find the highest product you can get from three of the integers.
The input arrayOfInts will always have at least three integers.
 */

const getHighestThree = (inputArray) => {

  // Keep track of all variables needed to evaluate array greedily
  let highest = Math.max(inputArray[0], inputArray[1]);
  let lowest = Math.min(inputArray[0], inputArray[1]);
  let highestTwoProduct = highest * lowest;
  let lowestTwoProduct = highest * lowest;
  let highestThreeProduct = highestTwoProduct * inputArray[2];

  // Loop through the array, updating all of our variables at each step
  inputArray.forEach((value, index) => {
    if (index < 2) { return }
    highestThreeProduct = Math.max(value * highestTwoProduct, value * lowestTwoProduct, highestThreeProduct);
    highestTwoProduct = Math.max(value * highest, value * lowest, highestTwoProduct);
    lowestTwoProduct = Math.min(value * lowest, value * highest, lowestTwoProduct);
    highest = Math.max(value, highest);
    lowest = Math.min(value, lowest);
  });

  return highestThreeProduct;
}


/**
Write a function mergeRanges() that takes an array of meeting time ranges and returns an array of condensed ranges.
Do not assume the meetings are in order. The meeting times are coming from multiple teams.
Write a solution that's efficient even when we can't put a nice upper bound on the numbers representing our time ranges.
*/

const mergeRanges = (inputArray) => {

  // First we'll need to sort our meetings by start time
  const sortedMeetings = inputArray.sort((a, b) => {
    if (a.startTime < b.startTime) { return -1 }
    else if (a.startTime > b.startTime) { return 1 }
    else { return 0 }
  });

  // Set up a new array to hold our merged meetings; seed with first meeting
  let mergedMeetings = [sortedMeetings[0]];

  // Loop through list starting at second index, merging as necessary
  sortedMeetings.forEach((currentMeeting, index) => {
    if (index === 0) { return }

    // If current meeting starts before last meeting ended, merge them
    const lastMeeting = mergedMeetings[mergedMeetings.length - 1];
    if (currentMeeting.startTime <= lastMeeting.endTime) {
      lastMeeting.endTime = Math.max(currentMeeting.endTime, lastMeeting.endTime);

      // Else meeting can't be merged further ... add it to mergedMeetings array
    } else { mergedMeetings = [...mergedMeetings, currentMeeting]; }
  });

  // Finally, return the array of merged meetings
  return mergedMeetings;
}

/**
You quirky boss collects rare, old coins...
They found out you're a programmer and asked you to solve something they've been wondering for a long time.

Write a function that, given:

an amount of money
an array of coin denominations
computes the number of ways to make the amount of money with coins of the available denominations.

Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output 
4—the number of ways to make 44¢ with those denominations:

1¢, 1¢, 1¢, 1¢
1¢, 1¢, 2¢
1¢, 3¢
2¢, 2¢

*/
const moneyPossibilities = (amountLeft, denominations, currentIndex) => {

  currentIndex = currentIndex || 0;

  // Amount is hit spot on
  if (amountLeft === 0) { return 1 }

  // Overshot, so don't count toward total
  if (amountLeft < 0) { return 0 }

  // No denominations left to use
  if (currentIndex === denominations.length) { return 0 }

  console.log("Checking ways to make " + amountLeft + " with " + denominations.slice(currentIndex));

  // Select current coin
  const currentCoin = denominations[currentIndex];

  // See how many possibilities we can get for
  // each number of times to use current coin
  let numPossibilities = 0;
  while (amountLeft >= 0) {
    numPossibilities += moneyPossibilities(amountLeft, denominations, currentIndex + 1);
    amountLeft -= currentCoin;
  }

  return numPossibilities;
};

/**
 * 6: Write a function to find the rectangular intersection of two given
 * rectangles. As with the example above, rectangles are always "straight" and 
 * never "diagonal." More rigorously: each side is parallel with either the 
 * x-axis or the y-axis.
 * @typedef {object} rectangle expected function input
 * @property {number} leftX
 * @property {number} bottomY
 * @property {number} height
 * @property {number} width
 * @param {rectangle} first
 * @param {rectangle} second
 */
const findIntersection = (first, second) => {
  const xOverlap = findRangeOverlap(
    { start: first.leftX, length: first.width, },
    { start: second.leftX, length: second.width, }
  );
  const yOverlap = findRangeOverlap(
    { start: first.bottomY, length: first.height, },
    { start: second.bottomY, length: second.height, }
  );
  return ({
    leftX: xOverlap.start,
    bottomY: yOverlap.start,
    width: xOverlap.length,
    height: yOverlap.length,
  });
};

/**
 * Finds overlap in one-dimensional ranges that have a start coordinate and 
 * width
 * @typedef {object} line
 * @property {number} leftX
 * @property {number} width
 * @param {line} line1
 * @param {line} line2
 * @return {object} overlap object having same properties as each input
 */
const findRangeOverlap = (line1, line2) => {
  // Calculate end coordinate for each line
  line1.rightX = line1.start + line1.length;
  line2.rightX = line2.start + line2.length;
  // Lines that don't overlap automatically return zero position and width
  if (line1.rightX <= line2.start || line2.rightX <= line1.start) {
    return ({ start: 0, length: 0, });
  }
  // Overlapping lines should return their overlap start and width
  const start = Math.max(line1.start, line2.start);
  const length = Math.min(line1.rightX, line2.rightX) - start;
  return ({ start, length });
};

/** Write a class TempTracker with these methods:
 * insert()—records a new temperature
 * getMax()—returns the highest temp we've seen so far
 * getMin()—returns the lowest temp we've seen so far
 * getMean()—returns the mean of all temps we've seen so far
 * getMode()—returns a mode of all temps we've seen so far
 * Optimize for space and time.
 */
class TempTracker {
  constructor() {
    // Min and Max Temps
    this.minTemp = null;
    this.maxTemp = null;

    // Mode and mode calc variables
    this.modeTemp = null;
    this.modeCount = 0;
    this.temps = {};
    
    // Mean and mean calc variables
    this.meanTemp = null;
    this.tempsCount = 0;
    this.tempsTotal = 0;
  }

  insert(reading) {
    // Update min temp
    this.minTemp = (reading < this.minTemp || this.minTemp === null
      ? reading
      : this.minTemp
    );
    // Update max temp
    this.maxTemp = (reading > this.maxTemp || this.maxTemp === null
      ? reading
      : this.maxTemp
    );
    // Update mean temp and calc variables
    this.tempsCount += 1;
    this.tempsTotal += reading;
    this.meanTemp = this.tempsTotal / this.tempsCount;

    // Update temps object and calculate new mode temp
    this.temps[reading] ? this.temps[reading] +=1 : this.temps[reading] = 1;
    this.modeTemp = (this.temps[reading] > this.modeCount
      ? reading
      : this.modeTemp
    );
    this.modeCount = this.temps[this.modeTemp];
  }

  getMin() {
    return this.minTemp;
  }

  getMax() {
    return this.maxTemp;
  }

  getMean() {
    return this.meanTemp;
  }

  getMode() {
    return this.modeTemp;
  }
}

/**
 * Write a function to see if a binary tree ↴ is "superbalanced" (a new tree 
 * property we just made up).
 * A tree is "superbalanced" if the difference between the depths of any two 
 * leaf nodes is no greater than one.
 */

/**
* Write a function to find the 2nd largest element in a binary search tree
*/

// First, implement a function to find the largest element in the tree
const findLargestElement = (node) => {

  // Check that the tree has at least one node
  if (!node) { throw new Error("Tree must have at least one node") }

  // Traverse tree until the right-most element is hit - return its value
  let current = node;
  while (current) {
    if (!current.right) { return current.value }
    current = current.right;
  }
};

// Then, implement function to find the largest element in the tree
const findSecondLargestElement = (node) => {

  // Ensure tree has at least two nodes
  if (!node.left && !node.right) {
    throw new Error("Tree must have at least two nodes");
  }

  // Loop through tree until we find the second largest element
  let current = node;
  while (current) {

    // Account for largest node having a left subtree
    if (!current.right && current.left) {
      return findLargestElement(current.left);
    }

    // Account for current node being parent of largest node where largest node
    // has no left subtree
    if (current.right &&
      !current.right.right &&
      !current.right.left) {
      return current.value;
    }

    // Otherwise we're not at the second largest node, continue right
    current = current.right;
  }
};