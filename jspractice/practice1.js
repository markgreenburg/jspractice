"use strict";

// Write a function hello which given a name, says hello to the name.
function hello(name) {
    name = name || "anonymous";
    console.log("hello, " + name + "!");
}

function madlib(name, subject) {
    return name + "'s favorite subject is " + subject;
}

// Write a function tipAmount that is given the bill amount and the level of
// service (one of good, fair and poor) and returns the dollar amount for the
// tip.
function tipAmount(bill, serviceLevel) {
    var tipPercent;
    if (serviceLevel === 'good') {
        tipPercent = 0.2;
    } else if (serviceLevel === 'fair') {
        tipPercent = 0.15;
    } else {
        tipPercent = 0.1;
    }
    return bill * tipPercent;
}


// Write a function totalAmount that takes the same arguments as tipAmount
// except it returns the total as the tip amount plus the bill amount. This
// function may make use of tipAmount as a sub-task.
function totalAmount(bill, serviceLevel) {
    bill += tipAmount(bill, serviceLevel);
    return bill;
}

// Write a function splitAmount that takes the bill amount and the level of
// service, and the number of people to split the bill between. It will return
// the final amount for each person.
function splitAmount(bill, serviceLevel, numPeople) {
    numPeople = numPeople || 1;
    return totalAmount(bill, serviceLevel) / numPeople;
}

// Write a function printNumbers which is given a start number and an end
// number. It will print the numbers from one to the other, one per line
function printNumber(start, end) {
    for (var i = start; i <= end; i++) {
        console.log(i);
    }
}

// Write two versions of the above function. One using a while loop and the
// other using a for loop.
function printNumberWhile(start, end) {
    var count = start;
    while (count <= end) {
        console.log(count);
        count ++;
    }
}

// Write a function printSquare which is given a size and prints a square of
// that size using asterisks.
function printSquare(numToSquare) {
    for (var i = 0; i <= numToSquare; i++) {
        console.log("*" * numToSquare);
    }
}

// Write function printBox which is given a width and height and prints a
// hollow box of those given dimensions.
function printBox(width, height) {
    console.log("*" * width);
    for (var i = 0; i <= (height - 2); i++) {
        console.log("*" + " " * (width - 2) + "*");
    }
    console.log("*" * width);
}

// Write a function printBanner which is given some text and prints a banner
// with a border surrounding the text. The border has to stretch to the length
// of the text.
function printBanner(textToPrint) {
    textToPrint = "*" + textToPrint + "*";
    console.log("*" * textToPrint.length);
    console.log(textToPrint);
    console.log("*" * textToPrint.length);
}

// Write a function factors which is given a number and returns an array
// containing all its factors.
function factors(numToFactor) {
    var factorArray = [];
    for (var divisor = 1; divisor <= numToFactor; divisor++) {
        if (numToFactor % divisor ===0) {
            factorArray.push(divisor);
        }
    }
    return factorArray;
}

// Write a function cipher which is given a string, an offset, and returns the
// Caesar cipher of the string.
function cipher(plainString, offset) {
    // set up alphabet array
    plainString = plainString.lower;
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var cipherString = "";
    var currentIndex;
    var newIndex;
    for (var i = 0; i <= plainString.length; i++) {
        if (alphabet.indexOf(plainString[i]) >= 0) {
            currentIndex = alphabet.indexOf(plainString[i]);
            newIndex = currentIndex + offset;
            if (newIndex > alphabet.length) {
                newIndex -= 26;
            }
            cipherString.push(alphabet[newIndex]);
        }
        else {
            cipherString.push(plainString[i]);
        }
    }
    return cipherString;
}

// Write a function decipher which is given a string, an offset, and returns
// the original message.
function decipher(cipherString, offset) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var plainString = "";
    var currentIndex;
    var newIndex;
    for (var i = 0; i <= cipherString.length; i++) {
        if (alphabet.indexOf(cipherString[i]) >= 0) {
            currentIndex = alphabet.indexOf(cipherString[i]);
            newIndex = currentIndex - offset;
            if (newIndex < 0) {
                newIndex = 26 - newIndex;
            }
            plainString.push(alphabet[newIndex]);
        }
        else {
            plainString.push(cipherString[i]);
        }
    }
    return plainString;
}

// Write a function leetspeak which is given a string, and returns the 
// leetspeak equivalent of the string. To convert text to its leetspeak version,
// make the following substitutions:
function leetSpeak(string) {
    string = string.upper
    for (var i = 0; i <= string.length; i++) {
        switch (string[i]) {
            case "A":
                string[i] = "4"
                break;
            case "E":
                string[i] = "3"
                break;
            case "G":
                string[i] = "6"
                break;
            case "I":
                string[i] = "1"
                break;
            case "O":
                string[i] = "0"
                break;
            case "S":
                string[i] = "5"
                break;
            case "T":
                string[i] = "7"
                break;
        }
    }
    return string;
}

// Write a function, which is given a string, return the result of extending
// any long vowels to the length of 5.
function longLongVowels(string) {
    var vowels = "aeiouy";
    var newStringList = []
    for (var i = 0; i <= string.length; i++) {
        if (vowels.indexOf(string[i]) >= 0) {
            for (var u = 0; u < 5; u++) {
                newStringList.push(string[i]);
            }
        }
        else {
            newStringList.push(string[i]);
        }
    }
    var newString = newStringList.join("");
    return newString;
}

// Write a function sumNumbers which is given an array of numbers and returns
// the sum of the numbers.
function sumNumbers(arrayToSum) {
    var sumOfArray = 0;
    for (var i = 0; i < arrayToSum.length; i++) {
        sumOfArray += arrayToSum[i];
    }
    return sumOfArray;
}

// Write a function positiveNumbers which is given an array of numbers and
// returns a new array containing only the positive numbers within the given
// array.
function getPositive(arrayToParse) {
    var positiveArray = [];
    for (var i=0; i < arrayToParse.length; i++) {
        if (arrayToParse[i] > 0) {
            positiveArray.push(arrayToParse[i]);
        }
    }
    return positiveArray;
}

// Write a function matrixAdd which is given two two-dimensional arrays, and
// returns a new two-dimensional array containing their matrix sum.
// [1, 2]   [5, 6]
// [3, 4]   [7, 8]
function matrixAdd(firstArray, secondArray) {
    var newMatrix = [];
    for (var i = 0; i < firstArray.length; i++) {
        var subMatrix = [];
        for (var u = 0; u < firstArray[i].length; u++) {
            subMatrix[u] = firstArray[i][u] + secondArray[i][u];
        }
        newMatrix.push(subMatrix);
    }
    return newMatrix;
}

// Write a function matrixMultiply which is given two two-dimensional arrays -
// you can assume the matricies are of size 2x2. It will return the result of
// matrix multiplication between the two given matricies.
//--	   --	       --	  --		--						           --
//| i0  i1  |	       | c0  c1  |		| i0 * c0 + i1 * d0	i0 * c1 + i1 * d1  |
//| j0  j1  |    *     | d0  d1  |  = 	| j0 * c0 + j1 * d0	j0 * c1 + j1 * d1  |
//--	    --	       --	  --		--						           --
function matMult(matrix1, matrix2) {
    var multipliedMatrix = [];
    for (var i = 0; i < matrix1.length; i++) {
        multipliedMatrix[i] = [];
        for (var j = 0; j < matrix1[i].length; j++) {
            var dotProduct = 0;
            for (var k = 0; k < matrix1[i].length; k++) {
                dotProduct += matrix1[i][k] * matrix2[k][j];
            }
            multipliedMatrix[i][j] = dotProduct;
        }
    }
    return multipliedMatrix;
}

// Debug

// console.log(longLongVowels("some string"));
// console.log(sumNumbers([1,2,3,4,5]));
// console.log(getPositive([-1, 0, 1, 2, 3, 4, -5, 6, -7]));
// console.log(matrixAdd([[1,2],[3,4]],[[5,6],[7,8]]));
// console.log(multiplyMatrices([[1,2],[3,4]],[[5,6],[7,8]]));
// console.log(matMult([[1,2],[3,4]],[[5,6],[7,8]]));
// Need to test other functions

