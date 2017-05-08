'use strict';
/* Print every number divisible by both 3 and 5 up to 100 */

console.log("First way, using JS Array and forEach to iterate...");
// Generate an array of appropriate length, then fill it with values
const populatedArray = Array.from(new Array(101), (val, index) => index);

// Iterate over the array and print out each value if it's divisible by 3 and 5 */
populatedArray.forEach((value) => {
    if (value%3 === 0 && value%5 === 0) { console.log(value) }
});

// Using less memory, in one go
console.log("With a for loop: ");
for (let i = 1; i <= 100; i++) {
    if (i%3 === 0 && i%5 === 0) { console.log(i) }
}

/* Find the smallest value in an integer array without sorting it */
const minArray = [0, 1, 2, -50, -12, 100, -100];

// Using forEach
let currentMin = minArray[0];
minArray.forEach((val) => {
    if (val < currentMin) {
        currentMin = val;
    }
});

// Using reduce
const reduced = minArray.reduce((accum, val) => {
    return (val < accum ? val : accum);
}, minArray[0]);

// Reduce again
const minOfArray = minArray.reduce((accum, val) => {
    return (val < accum ? val : accum);
}, minArray[0]);

// Using classic for loop
let currentMinFor = minArray[0];
for (let i = 0; i < minArray.length; i++) {
    if (minArray[i] < currentMinFor) {
        currentMinFor = minArray[i];
    }
}

// Answers using each type of method
console.log(currentMin);
console.log(minOfArray);
console.log(reduced);
console.log(currentMinFor);

/* Print out a 12 x 12 aligned multiplication table */

// Using classic for loop
const makeMultTable = (endNum) => {
    for (let i = 1; i <= endNum; i++) {
        let rowArray = [];
        for (let j = 1; j <= endNum; j++) {
            rowArray.push(i * j);
        }
        console.log(rowArray);
    }
}

// Using forEach
const makeMultJS = (endNum) => {
    const firstRow = Array.from(new Array(endNum), (val, index) => index + 1);
    firstRow.forEach((item) => {
        const nextRow = Array.from(firstRow, (val, index) => {
            return item * val;
        });
        console.log(nextRow);
    });
}

console.log(" ");
console.log("regular for loop mult table");
makeMultTable(12);

console.log(" ");
console.log("forEach mult table");
makeMultJS(12);
