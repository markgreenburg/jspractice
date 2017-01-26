'use strict';
// Counter
// Imperative
function counter() {
    let count = 0;
    function increment() {
        count ++;
        return count;
    }
  return increment;
}

// Counter 2
function counter2(start) {
    let count = start;
    function increment() {
        count ++;
        return count;
    }
    return increment;
}

// Battleship
battleship = function() {
  const board = [
      ['o', ' ', 'o', 'o', ' '],
      ['o', ' ', ' ', ' ', ' '],
      ['o', ' ', 'o', 'o', 'o'],
      ['o', ' ', ' ', ' ', ' '],
      [' ', ' ', 'o', ' ', 'o'],
      [' ', ' ', 'o', ' ', 'o']
  ];
  fire = function(row, col) {
    if (board[row][col] === 'o') {
      board[row][col] = 'x'
      return 'Hit!'
    } else {
      return 'Miss'
    }
  }
  return {
    fire: fire
  }
}

// Battleship module pattern
battleship = function() {
  const board = [
      ['o', ' ', 'o', 'o', ' '],
      ['o', ' ', ' ', ' ', ' '],
      ['o', ' ', 'o', 'o', 'o'],
      ['o', ' ', ' ', ' ', ' '],
      [' ', ' ', 'o', ' ', 'o'],
      [' ', ' ', 'o', ' ', 'o']
  ];
  fire = function(row, col) {
    if (board[row][col] === 'o') {
      board[row][col] = 'x'
      return 'Hit!'
    } else {
      return 'Miss'
    }
  }
  return {
    fire: fire
  }
}

// Rewrite the following code (both the function and the code calling the
// function) in continuation-passing style:
// function square(num) {
//   return num * num;
// }

// var squared = square(5);
const square = (num, callback) => {
    return callback(num);
}

const actuallySquare = (num) => { return num * num }

// Using our pre-defined function...
const squareFour = square(4, actuallySquare);

// Using an anonymous function...
const squareFour = square(4, (num) => { return num * num });

// Rewrite the following code (both of the functions and the calling code) in
// function squareRoot(num) {
//   return Math.sqrt(num);
// }

// var x = 4;
// var y = 3;
// var answer = squareRoot(square(x) + square(y));
// console.log('The answer is: ' + answer);

const squareRoot = (num, callback) => {
  return callback(num);
}

const actuallyDivide = (num) => { return Math.sqrt(num) }

// Add a 1000 millisecond delay to the CPS version of the square function you
// wrote for the last exercise, and a 500 millisecond delay to the squareRoot
// function. Re-run the code and see that there's a delay before the answer is
// printed.
const square = (num, callback) => {
    setTimeout(() => {
      console.log(callback(num));
    }, 1000);
}

// Call using predefined function...
square(4, actuallySquare);

// Call with anonymous function...
square(4, (num) => { return num * num });

const squareRoot = (num, callback) => {
  setTimeout(() => {
    console.log(callback(num));
  }, 500);
}

const actuallyDivide = (num) => { return Math.sqrt(num) }

// Call using anonymous function...
squareRoot(16, (num) => { return Math.sqrt(num) });

// Call using our pre-defined function...
squareRoot(16, actuallyDivide);