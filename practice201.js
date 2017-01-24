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

