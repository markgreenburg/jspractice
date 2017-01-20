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
    while (start <= end) {
        console.log(start);
        start++;
    }
}

// Write a function printSquare which is given a size and prints a square of
// that size using asterisks.
function printSquare(numToSquare) {
    for (var i = 0; i < numToSquare; i++) {
        console.log("*".repeat(numToSquare));
    }
}

// Write function printBox which is given a width and height and prints a
// hollow box of those given dimensions.
function printBox(width, height) {
    console.log("*".repeat(width));
    for (var i = 0; i < (height - 2); i++) {
        console.log("*" + " ".repeat(width - 2) + "*");
    }
    console.log("*".repeat(width));
}

// Write a function printBanner which is given some text and prints a banner
// with a border surrounding the text. The border has to stretch to the length
// of the text.
function printBanner(textToPrint) {
    textToPrint = "*" + textToPrint + "*";
    console.log("*".repeat(textToPrint.length));
    console.log(textToPrint);
    console.log("*".repeat(textToPrint.length));
}

// Write a function factors which is given a number and returns an array
// containing all its factors.
function factors(numToFactor) {
    var factorArray = [];
    for (var divisor = 1; divisor <= numToFactor; divisor++) {
        if (numToFactor % divisor === 0) {
            factorArray.push(divisor);
        }
    }
    return factorArray;
}

// Write a function cipher which is given a string, an offset, and returns the
// Caesar cipher of the string.
function cipher(plainString, offset) {
    // set up alphabet array
    plainString = plainString.toLowerCase()
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var cipherString = "";
    var currentIndex;
    var newIndex;
    for (var i = 0; i < plainString.length; i++) {
        if (alphabet.indexOf(plainString[i]) >= 0) {
            currentIndex = alphabet.indexOf(plainString[i]);
            newIndex = currentIndex + offset;
            if (newIndex >= alphabet.length) {
                newIndex -= 26;
            }
            cipherString += alphabet[newIndex];
        }
        else {
            cipherString += plainString[i];
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
    for (var i = 0; i < cipherString.length; i++) {
        if (alphabet.indexOf(cipherString[i]) >= 0) {
            currentIndex = alphabet.indexOf(cipherString[i]);
            newIndex = currentIndex - offset;
            if (newIndex < 0) {
                newIndex = 26 + newIndex;
            }
            plainString += alphabet[newIndex];
        }
        else {
            plainString += cipherString[i];
        }
    }
    return plainString;
}
// Write a function leetspeak which is given a string, and returns the
// leetspeak equivalent of the string. To convert text to its leetspeak version,
// make the following substitutions:
function leetSpeak(string) {
    string = string.toUpperCase();
    var leetString = ""
    for (var i = 0; i < string.length; i++) {
        switch (string[i]) {
            case "A":
                leetString += string[i]
                break;
            case "E":
                leetString += string[i]
                break;
            case "G":
                leetString += string[i]
                break;
            case "I":
                leetString += string[i]
                break;
            case "O":
                leetString += string[i]
                break;
            case "S":
                leetString += string[i]
                break;
            case "T":
                leetString += string[i]
                break;
            default:
                leetString += string[i];
                break;
        }
    }
    return leetString;
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

// Write a function rockPaperScissors which takes the throw of player 1 and the
// 'scissors'. It will return 'player 1' if player 1 wins, 'player 2' if player
// 2 wins, and 'draw' if there is no winner.
function rockPaperScissors(player1, player2) {
    var winner;
    if (player1 === player2) {
        winner = "tie";
        return winner;
    }
    switch (player1) {
        case "rock":
            switch (player2) {
                case "paper":
                    winner = "player 2";
                    break;
                case "scissors":
                    winner = "player 1";
                    break;
            }
            break;
        case "paper":
            switch (player2) {
                case "rock":
                    winner = "player 1";
                    break;
                case "scissors":
                    winner = "player 2";
                    break;
            }
            break;
        case "scissors":
            switch (player2) {
                case "rock":
                    winner = "player 2";
                    break;
                case "paper":
                    winner = "player 1";
                    break;
            }
            break;
    }
    return winner;
}

// Write a function ticTacToe which takes a two-dimensional array of size 3x3.
// Each cell in the two dimensional array can be one of 'O', 'X', or null. The
// ticTacToe function will determine the winner by returning 'O' if O makes a
// row; returning 'X' if X makes a row; return null if neither makes a row
function ticTacToe(ticArray) {
    // case one of the rows is all the same
    for (var row = 0; row < ticArray.length; row++) {
        if (ticArray[row][0] === ticArray[row][1] && ticArray[row][0] === 
        ticArray[row][2]) {
            return ticArray[row][0];
        }
    }
    // case one of the columns is all the same
    for (var index = 0; index < ticArray[0].length; index++) {
        if (ticArray[0][index] === ticArray[1][index] && ticArray[0][index] ===
        ticArray[2][index]) {
            return ticArray[0][index];
        }
    }
    // case a diagonal is all the same
    if ((ticArray[0][0] === ticArray[1][1] && ticArray[0][0] === ticArray[2][2]) || (ticArray[0][2] === ticArray[1][1] && ticArray[0][2] === ticArray[2][0])) {
        return ticArray[1][1];
    }
    // if no winner found, return null result
    return "tie game";
}

// Given the following dictionary, representing a mapping from names to phone
// numbers:
// var phonebookDict = {
//   Alice: '703-493-1834',
//   Bob: '857-384-1234',
//   Elizabeth: '484-584-2923'
// }
// Write code to...
// print Elizabeth's phone number
function printPhoneNumber(name, dict) {
    console.log(dict[name] || "name not found");
}

// Add a entry to the dictionary: Kareem's number is 938-489-1234.
function addNumber(name, phoneNum, dict) {
    dict[name] = phoneNum;
    return dict;
}

// Delete Alice's phone entry.
function deleteNumber(name, dict) {
    delete dict[name];
    return dict;
}

// Change Bob's phone number to '968-345-2345'.
function changeNumber(name, phoneNum, dict) {
    dict = addNumber(name, phoneNum, dict);
    return dict;
}

// Print all the phone entries.
function printAll(dict) {
    for (var key in dict) {
        console.log(dict[key]);
    }
}

// Write a function histogram which takes a string as argument. It will tally
// (histogram) the number of times each character appears in the string, and
// return the tally as an object.
function histogram(string) {
    var charCounts = {};
    for (var index = 0; index < string.length; index++) {
        if (string[index] in charCounts) {
            charCounts[string[index]]++;
        }
        else {
            charCounts[string[index]] = 1;
        }
    }
    return charCounts;
}

// Print the top 2 most frequently used letters in the string.
function sortHistogram(histogramObj) {
    var histogramArray = [];
    for (var key in histogramObj) {
        var histogramKeyPair = {
            'key': key,
            'count': histogramObj[key]
        }
        histogramArray.push(histogramKeyPair);
    }
    histogramArray.sort(function (a, b) {
        return b.count - a.count;
    })
    return histogramArray;
}

// Write a function which takes an array of numbers as input and returns a new
// array containing only the positive numbers in the given array.
function isPositive(item) {
    return item > 0;
}

function positivesOnly(someArray) {
    return someArray.filter(isPositive);
}

// Write a function which takes an array of numbers as input and returns a new
// array containing only the even numbers in the given array.
function isEven(item) {
    return item % 2 == 0;
}

function evensOnly(someArray) {
    someArray.filter(isEven);
}

// Write a function which takes an array of numbers as input and returns a new
// array containing result of squaring each of the numbers in the given array
// by two. Example: squareTheNumbers([1, 2, 3]) should give [1, 4, 9]
function squareEach(item) {
    return Math.pow(item, 2);
}

function squareNums(someArray) {
    return someArray.map(squareEach);
}

// Write a function which takes an array of city objects like such:
// var cities = [
//   { name: 'Los Angeles', temperature: 60.0},
//   { name: 'Atlanta', temperature: 52.0 },
//   { name: 'Detroit', temperature: 48.0 },
//   { name: 'New York', temperature: 80.0 }
// ];
// as input and returns a new array containing the cities whose temperature is
// cooler than 70 degrees.
function lowTemps(city) {
    return city.temperature < 70;
}

function coldCities(someArray) {
    return someArray.filter(lowTemps);
}

// Write a function which takes an array of city objects like the above problem
// as input and returns an array of the cities names.
function getName(city) {
    return city.name;
}

function listCities(someArray) {
    return someArray.map(getName);
}

// Given an array of people's names print out 'Good Job, {{name}}!' for each
// person's name, one on a line.
function congratulate(person) {
    console.log("Good job, " + person + "!");
}

function congratEveryone(someArray) {
    return someArray.forEach(congratulate);
}

// Given an array of strings such the array of names given in the previous
// problem, sort them by alphabetically order.
function sortNames(someArray) {
    return someArray.sort();
}

// Sort the same array, but not by alphabetically order, but by how long each
// name is, shortest name first.
function compareLength(a, b) {
    return a.length - b.length;
}

function sortNamesByLength(someArray) {
    return someArray.sort(compareLength);
}

// Given an array of array of numbers like:
// var arr = [
//   [1, 3, 4],
//   [2, 4, 6, 8],
//   [3, 6]
// ];
// Sort the array by the sum of each inner array. For the above example, the
// respective sums for each inner array is 8, 20, and 9.
function getSum(a, b) {
    return a + b;
}

function sortBySum(a, b) {
    return a.reduce(getSum) - b.reduce(getSum);
}

function sortSums(someArray) {
    return someArray.sort(sortBySum);
}

// Given this function:
function call3Times(fun) {
  fun();
  fun();
  fun();
}
// Use the call3Times function to print "Hello, world!" 3 times.
// Either of the below will work:
function fun(person) {
    console.log("Hello, " + person + "!");
}

function printNames(someArray) {
    someArray.forEach(fun)
}

// var fun = function() {
//     console.log("Hello, world!");
// }

// Write a function sum that takes an array of numbers as argument and returns
// the sum of those numbers. Use the reduce method to do this.
function sumArray(someArray) {
    return someArray.reduce(getSum);
}

// Write a function acronym that takes an array of words as argument and
// returns the acronym of the words. Use the reduce method to do this.

//Mine
function getFirstLetter(word) {
    return word[0];
}

function getAcronym(word1, word2) {
    return word1 + word2;
}

function acronym(someArray) {
    var firstLetters = someArray.map(getFirstLetter);
    return firstLetters.reduce(getAcronym);
}

//Karissa
function addLetters(currentValue, word) {
    return currentValue + word[0].toUpperCase();
}
function karissaAcronym(someArray) {
    someArray.reduce(addLetters, '');
}

// Damian
function combine(a, b) {
    if(a == "") {
        return b[0];
    }
    return a + b[0];
}
function damianAcronym(someArray) {
    return someArray.reduce(combine,"");
}

// Implement a forEach function which takes two arguments: an array arr and a
// function fun. It will call fun passing each item in arr to fun as the first
// argument.
// function fun(person) {
//     console.log("Hello, " + person.name + "!");
// }
function forEach(someArray, doStuff) {
    someArray.forEach(doStuff);
}

// Implement a map function which takes two arguments: an array arr and a
// function fun. It will return a new array, with each of its results being the
// result of calling fun with argument
function fun(person) {
    return "Hello, " + person + "!";
}

function map(someArray, doStuff) {
    // This will work:
    // return someArray.map(doStuff);
    // So will this:
    var greetList = [];
    for (var personIndex in someArray) {
        greetList.push(fun(someArray[personIndex].name));
    }
    return greetList;
}

////////////////
///// Debug/////
////////////////

var arr = [
  [1, 3, 4],
  [2, 4, 6, 8],
  [3, 6]
];

var peopleAttributes = [
  { name: 'Bob' },
  { name:'Alice' },
  { name:'Joe' }
];

var people = [
  'Dom',
  'Lyn',
  'Kirk',
  'Autumn',
  'Trista',
  'Jesslyn',
  'Kevin',
  'John',
  'Eli',
  'Juan',
  'Robert',
  'Keyur',
  'Jason',
  'Che',
  'Ben'
];

var phonebookDict = {
  Alice: '703-493-1834',
  Bob: '857-384-1234',
  Elizabeth: '484-584-2923'
}

var cities = [
  { name: 'Los Angeles', temperature: 60.0},
  { name: 'Atlanta', temperature: 52.0 },
  { name: 'Detroit', temperature: 48.0 },
  { name: 'New York', temperature: 80.0 }
];

// Given this code:
function Person(name, email, phone) {
  this.name = name;
  this.email = email;
  this.phone = phone;
}

Person.prototype.greet = function(other) {
  console.log('Hello ' + other.name + ', I am ' + this.name + '!');
};

// Write code to:
// 1. Instantiate an instance object of Person with name of 'Sonny', email of 
// 'sonny@hotmail.com', and phone of '483-485-4948', store it in the variable 
// sonny.
var sonny = new Person('Sonny', 'sonny@hotmail.com', '483-485-4948');

// 2. Instantiate another person with the name of 'Jordan', email of 
// 'jordan@aol.com', and phone of '495-586-3456', store it in the variable 
// 'jordan'.
var jordan = new Person('Jordan', 'jordan@aol.com', '495-586-3456');

// 3. Have sonny greet jordan using the greet method.
sonny.greet(jordan);

// 4. Have jordan greet sonny using the greet method.
jordan.greet(sonny);

// 5. Write a print statement to print the contact info (email and phone) of 
// Sonny.
console.log(sonny.email + ", " + sonny.phone);

// 6. Write another print statement to print the contact info of Jordan.
console.log(jordan.email + ", " + jordan.phone);

// console.log(map(peopleAttributes, fun));
// forEach(peopleAttributes, fun);
// console.log(acronym(people));
// console.log(acronym(people));
// console.log(sumArray([5, 3, 4, 9, 12, -1, 0]));
// call3Times(fun);
// console.log(sortSums(arr));
// console.log(sortNamesByLength(people));
// console.log(sortNames(people));
// congratEveryone(people);
// console.log(listCities(cities));
// console.log(coldCities(cities));
// console.log(squareNums([-1, 4, 0, 5, -2, 12, -9]));
// console.log(positivesOnly([-1, 4, 0, 5, -2, 12, -9]));
// console.log(evensOnly([-1, 4, 0, 5, -2, 12, -9]));
// console.log(histogram("A random string to count"));
// var sortedArray = sortHistogram(histogram("A random string to count"));
// console.log(sortedArray[0]);
// console.log(sortedArray[1]);
// printPhoneNumber("Alice", phonebookDict);
// console.log(addNumber("Mark", "123-456-7890", phonebookDict));
// console.log(deleteNumber("Mark", phonebookDict));
// console.log(changeNumber("Bob", "968-345-2345", phonebookDict));
// printAll(phonebookDict);
// console.log(hello());
// console.log(madlib("Mark", "science"));
// console.log(splitAmount(150, "fair", 5));
// console.log(printNumber(2, 6));
// console.log(printNumberWhile(2, 6));
// console.log(printSquare(2));
// console.log(printBox(5, 4));
// console.log(printBanner("Hey There"));
// console.log(factors(120));
// console.log(cipher("Hey there what's going on", 13));
// console.log(decipher("url gurer jung'f tbvat ba",13));
// console.log(leetSpeak("Hey there what's going on"));
// console.log(longLongVowels("some string"));
// console.log(sumNumbers([1,2,3,4,5]));
// console.log(getPositive([-1, 0, 1, 2, 3, 4, -5, 6, -7]));
// console.log(matrixAdd([[1,2],[3,4]],[[5,6],[7,8]]));
// console.log(multiplyMatrices([[1,2],[3,4]],[[5,6],[7,8]]));
// console.log(matMult([[1,2],[3,4]],[[5,6],[7,8]]));
// console.log(rockPaperScissors("rock", "scissors"));
// console.log(ticTacToe([["X","O","X"],
//                        ["O","X","O"],
//                        ["O","X","O"]]));