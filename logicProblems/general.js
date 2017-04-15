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
    if (typeof stockArray === "undefined" || stockArray.length < 2) {
        throw new Error("need at least two prices");
    }

    // Initialize profit variable
    let largestProfit = stockArray[1] - stockArray[0];

    // Iterate through array
    stockArray.forEach((value, index) => {

        // Iterate through rest of array
        for (let i = index + 1; i <= (stockArray.length); i ++) {
            
            // Calculate profit as i - value
            potentialProfit = stockArray[i] - value;
            
            // If greater than scoped profit value, overwrite scoped profit var
            largestProfit = (potentialProfit > largestProfit ? 
                    potentialProfit : largestProfit);
        }
    });

    // Return greatest profit
    return largestProfit;
}


// Initialize an array of stock prices to test logic against
const stockArray = [ 499, 429, 513, 499, 512, 509, 487, 495, 514, 535, 512, 511, 525 ]; // 535 - 429 = 106
// How about if the last timestamp had the highest price?
const stockArrayHighestLast = [ 499, 429, 513, 499, 512, 509, 487, 495, 514, 535, 512, 511, 549 ]; // 549 - 429 = 120
// How about if the last timestamp had the lowest price?
const stockArrayLowestLast = [ 499, 429, 513, 499, 512, 509, 487, 495, 514, 535, 512, 511, 419 ]; // 535 - 429 = 106
// How about if the stock only lost money yesterday?
const loserStockArray = [ 499, 495, 494, 493, 492, 491, 490, 489, 488, 487, 486, 485 ];

// Run function with some "tests", print output to stdout
console.log("// Initialize an array of stock prices to test logic against");
console.log(getMaxProfit(stockArray));
console.log("// How about if the last timestamp had the highest price?");
console.log(getMaxProfit(stockArrayHighestLast));
console.log("// How about if the last timestamp had the lowest price?");
console.log(getMaxProfit(stockArrayLowestLast));
console.log("// How about if the stock only lost money yesterday?");
console.log(getMaxProfit(loserStockArray));
