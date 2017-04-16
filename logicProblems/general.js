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
Write a function to find the 2nd largest element in a binary search tree
Tree class spec:

function BinaryTreeNode(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
}

BinaryTreeNode.prototype.insertLeft = function(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
};

BinaryTreeNode.prototype.insertRight = function(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
};

 */

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

console.log(getHighestThree([-10, -10, 1, 3, 2]));

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
}

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
}






/**
"Tests" - uncomment as needed
TO-DO: Implement tests via Jasmine in separate module
// Initialize an array of stock prices to test logic against
const stockArray = [ 499, 429, 513, 499, 512, 509, 487, 495, 514, 535, 512, 511, 525 ]; // 535 - 429 = 106
// How about if the last timestamp had the highest price?
const stockArrayHighestLast = [ 499, 429, 513, 499, 512, 509, 487, 495, 514, 535, 512, 511, 549 ]; // 549 - 429 = 120
// How about if the last timestamp had the lowest price?
const stockArrayLowestLast = [ 499, 429, 513, 499, 512, 509, 487, 495, 514, 535, 512, 511, 419 ]; // 535 - 429 = 106
// How about if the stock only lost money yesterday?
const loserStockArray = [ 499, 495, 494, 493, 492, 491, 490, 489, 488, 487, 486, 485 ];

// console.log("// Initialize an array of stock prices to test logic against");
// console.log(getMaxProfit(stockArray));
// console.log("// How about if the last timestamp had the highest price?");
// console.log(getMaxProfit(stockArrayHighestLast));
// console.log("// How about if the last timestamp had the lowest price?");
// console.log(getMaxProfit(stockArrayLowestLast));
// console.log("// How about if the stock only lost money yesterday?");
// console.log(getMaxProfit(loserStockArray));

const productArray = [10, 8, 12, 3, 1, 15, 7, 5]; // [ 453600, 567000, 378000, 504000, 4536000, 302400, 648000, 907200 ]
console.log(getAllProductsExceptIndex(productArray));
 */
