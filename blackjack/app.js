'use strict';
// You will implement the rest of these exercises using Test-Driven Development.
// Create a constructor Card. A card object will have 2 properties:
// point - the point value of the card: a number between 1 and 13.
// suit - the suit of the card: one of diamonds, clubs, hearts and spades.

// Classical constructors
function Card(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getImageUrl = function() {
    return "<img src='images/" + this.point + "_of_" + this.suit + ".png'" + 
        " height='140px' width='100px'/>";
}

// staticmethod to accomplish the same...
function getImageFromCard(cardobj) {
  return "<img src='images/'" + cardobj.point + "_of_" + cardobj.suit + ".png'"
      + " height='140px' width='100px'/>";
}

// Draw whatever we need to the screen using JQuery append
// '#dealer-hand', '#player-hand'
function drawOnScreen(whatHtml, where) {
  if (where === '#player-hand' || where === '#dealer-hand') {
    $(where).append(whatHtml);
  }
  else if (where === '#player-points' || where === '#dealer-points') {
    $(where).empty().append(whatHtml);
  }
  // $(where).append(whatHtml);
}

// function cardsToScreen(card, divName) {
//   const img_src = "<img src='" + card.getImageUrl() + "' height='140px'"
//       + " width='100px'/>";
//   $(divName).append(img_src);
// }

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
  drawOnScreen(cardObject.getImageUrl(), cardsDiv);
  this.points = calculatePoints(this.cardArray);
  drawOnScreen(this.points.toString(), pointsDiv);
  return this.cardArray;
}

function Deck() {
  this.cardsLeft = 52;
  this.cardArray = [];
  const suits = ["diamonds", "spades", "hearts", "clubs"];
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < points.length; j++) {
      this.cardArray.push(new Card(points[j], suits[i]));
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
  this.dealerHand = new Hand();
  this.playerHand = new Hand();
}

Game.prototype.deal = function() {
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
    console.log(newGame.playerHand);
    console.log(newGame.dealerHand);
    }, false);

document.getElementById('hit-button').addEventListener('click', function() {
    hitMe(newGame.gameDeck, newGame.playerHand, 'player');
    console.log(newGame.playerHand);
    }, false);

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