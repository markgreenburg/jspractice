'use strict';
// You will implement the rest of these exercises using Test-Driven Development.
// Create a constructor Card. A card object will have 2 properties:
// point - the point value of the card: a number between 1 and 13.
// suit - the suit of the card: one of diamonds, clubs, hearts and spades.

// Classical constructors
function Card(point, suit) {
  this.displayPoint = point;
  this.suit = suit;
  if (this.displayPoint > 10) {
    this.point = 10;
  }
  else {
    this.point = this.displayPoint;
  }
}

Card.prototype.getImageUrl = function() {
    return "<img src='images/" + this.displayPoint + "_of_" + this.suit + ".png'" + " height='140px' width='100px'/>";
}

// Draw whatever we need to the screen using JQuery append
// '#dealer-hand', '#player-hand'
function drawOnScreen(whatHtml, where, how) {
  if (how === 'append') {
    $(where).append(whatHtml);
  }
  else if (how === 'replace') {
    $(where).empty().append(whatHtml);
  }
}

function calculatePoints(cardArray) {
  console.log(cardArray);
  return cardArray.reduce(function(a, card) {
      a += card.point;
      return a;
  }, 0);
}

// Class to represent a hand of cards
function Hand() {
  this.cardArray = [];
  this.points = 0;
}

Hand.prototype.addCard = function(cardObject, divName) {
  let pointsDiv = '';
  let cardsDiv = '';
  if (divName === 'player') {
    pointsDiv = '#player-points';
    cardsDiv = '#player-hand';
  }
  else if (divName === 'dealer') {
      pointsDiv = '#dealer-points';
      cardsDiv = '#dealer-hand';
  }
  this.cardArray.push(cardObject);
  drawOnScreen(cardObject.getImageUrl(), cardsDiv, 'append');
  this.points = calculatePoints(this.cardArray);
  drawOnScreen(this.points.toString(), pointsDiv, 'replace');
  return this.cardArray;
}

function Deck() {
  this.cardArray = [];
  const suits = ["diamonds", "spades", "hearts", "clubs"];
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const decks = 3;
  for (let deck = 0; deck < decks; deck++) {
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < points.length; j++) {
        this.cardArray.push(new Card(points[j], suits[i]));
      }
    }
  }
}

Deck.prototype.shuffle = function() {
  let tempCard = {};
  for (let i = this.cardArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    tempCard = this.cardArray[j];
    this.cardArray[j] = this.cardArray[i];
    this.cardArray[i] = tempCard;
  }
}

Deck.prototype.draw = function() {
  this.totalCards -= 1;
  return this.cardArray.pop();
}

// Game class
function Game() {}

Game.prototype.initializeGame = function() {
  this.gameDeck = new Deck();
  console.log('new deck created');
  this.gameDeck.shuffle();
  console.log('new deck shuffled');
}

Game.prototype.deal = function() {
  this.dealerHand = new Hand();
  this.playerHand = new Hand();
  drawOnScreen('', '#messages', 'replace');
  drawOnScreen('', '#dealer-hand', 'replace');
  drawOnScreen('', '#player-hand', 'replace');
  drawOnScreen(this.dealerHand.points.toString(), '#dealer-points', 'replace');
  drawOnScreen(this.playerHand.points.toString(), '#player-points', 'replace');
  for (let cardsToDeal = 0; cardsToDeal < 2; cardsToDeal++) {
    hitMe(this.gameDeck, this.playerHand, 'player');
    hitMe(this.gameDeck, this.dealerHand, 'dealer');
  }
}

function hitMe(gamedeck, handofcards, divName) {
  handofcards.addCard(gamedeck.cardArray.pop(), divName);
}

// Start our game and set up event listeners
var newGame = new Game();
newGame.initializeGame();

document.getElementById('deal-button').addEventListener('click', function() {
    newGame.deal();
}, false);

document.getElementById('hit-button').addEventListener('click', function() {
    hitMe(newGame.gameDeck, newGame.playerHand, 'player');
    if (busted(newGame.playerHand)) {
      drawOnScreen('You busted, house wins!', '#messages', 'replace');
    }
    if (blackjack(newGame.playerHand)) {
      drawOnScreen('Blackjack! You win!', '#messages', 'replace');
    }
}, false);

document.getElementById('stand-button').addEventListener('click', function() {
while (!dealerMaxReached(newGame.dealerHand)) {
      hitMe(newGame.gameDeck, newGame.dealerHand, 'dealer');
    }
    if (dealerMaxReached(newGame.dealerHand)) {
      if (busted(newGame.dealerHand)) {
        drawOnScreen('Dealer busted, you win!', '#messages', 'replace');
      }
      else if (!playerWon(newGame.playerHand, newGame.dealerHand)) {
        drawOnScreen('House wins!', '#messages', 'replace');
      }
      else if (playerWon(newGame.playerHand, newGame.dealerHand)) {
        drawOnScreen('You win!', '#messages', 'replace');
      }
    }
}, false);

// conditions
// bust condition
function busted(cardHand) {
  if (cardHand.points > 21) {
    return true;
  }
  return false;
}

// blackjack
function blackjack(cardHand) {
  if (cardHand.points === 21) {
    return true;
  }
  return false;
}

//Dealer stays condition
function dealerMaxReached(cardHand) {
  if (cardHand.points >= 17) {
    return true;
  }
  return false;
}

//Forced win
function playerWon(playerHand, dealerHand) {
if (dealerHand.points >= 17
    && playerHand.points > dealerHand.points) {
    return true;
  }
  return false;
}


///////////
// Debug //
///////////
// const newDeck = new Deck();
// console.log("New Deck of cards: ");
// console.log(newDeck.cardArray);
// console.log("Shuffling...");
// newDeck.shuffle();
// console.log("Shuffled deck: ");
// console.log(newDeck.cardArray);
// console.log("Getting a new card...5 of diamonds");
// const newCard = new Card(5, "diamonds");
// console.log(newCard);
// console.log("Printing image path...");
// console.log(newCard.getImageUrl());
// console.log("Getting a new hand...");
// const newHand = new Hand();
// console.log(newHand);
// console.log("Adding the card to our hand...")
// console.log(newHand.addCard(newCard));
// console.log("Hand is now: ")
// console.log(newHand);