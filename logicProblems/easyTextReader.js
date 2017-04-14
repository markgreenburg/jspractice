'use strict';
/* Reads a txt document and provides a count of each word used */
const fs = require('fs');

// 1. Read contents of txt doc into memory
fs.readFile('/Users/Marek/Desktop/testDoc.txt', (err, data) => {
    if (err) {
        console.log("Error reading file!");
        return;
    }
    // 2. Un-format and split into word array for analysis
    const wordArray = data
        .toString()
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/\n/g, "")
        .split(" ");

    // 4. Iterate through and count
    let wordCountsArray = [];
    wordArray.forEach((word) => {
        // Get index of word in counts array if present
        const wordIndex = wordCountsArray.findIndex((value) => {
            return value[0] === word;
        });
        // If in array, increment counter
        if (wordIndex > -1) {
            wordCountsArray[wordIndex][1] += 1;
        // Otherwise, add item to array and init counter
        } else {
            wordCountsArray.push([word, 1]);
        }
    });
    console.log(wordCountsArray);
});


