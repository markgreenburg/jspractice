'use strict';
/////////////////////
// Stateful objects//
/////////////////////

// A single card
const card = (displayPoints, suit) => {
  const cardValue = ( displayPoints > 10 && 10 ) || displayPoints;
  const state = {
    "displayPoints": displayPoints,
    "points": cardValue,
    "suit": suit
  };
  return Object.assign(
    {},
    pointsGetter(state),
    imageUrlGetter(state)
  )
}

// A hand of cards (given to a player)
const hand = () => {
  let state = {
    "cardArray": [],
    "points": 0
  };
  return Object.assign(
    {},
    cardArrayGetter(state),
    pointsGetter(state),
    calculatePoints(state)
  )
}

// A playing deck of cards (can be comprised of any multiple of 52)
const deck = (numDecks) => {
  let state = {
    "cardArray": [],
    "decks": numDecks
  };
  return Object.assign(
    {},
    arrayPopulator(state),
    cardArrayGetter(state),
    arrayShuffler(state),
    cardPopper(state)
  )
}

//////////////////////
// Stateless objects//
//////////////////////

const arrayPopulator = (state) => ({
  "populateArray": () => {
    const suits = ["diamonds", "spades", "hearts", "clubs"];
    const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    for (let deck = 0; deck < state.decks; deck += 1) {
      for (let suit = 0; suit < suits.length; suit += 1) {
        for (let point = 0; point < points.length; point += 1) {
          state.cardArray.push(card(points[point], suits[suit]));
        }
      }
    }
  }
})

const arrayShuffler = (state) => ({
  "shuffleArray": () => {
    let tempCard = {};
    for (let i = state.cardArray.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * i);
      tempCard = state.cardArray[j];
      state.cardArray[j] = state.cardArray[i];
      state.cardArray[i] = tempCard;
    }
  }
})

const cardPopper = (state) => ({
  "popCard": () => state.cardArray.pop()
})

const calculatePoints = (state) => ({
  "calculatePoints": () => {
    return state.cardArray.reduce((accumulator, card) => {
      accumulator += card.getPoints();
      return accumulator;
    }, 0)
  }
})

const cardArrayGetter = (state) => ({
  "getCardArray": () => state.cardArray
})

const pointsGetter = (state) => ({
  "getPoints": () => state.points
})

const imageUrlGetter = (state) => ({
  "getImageUrl": () => ("<img src='images/" + state.displayPoints + "_of_" +
      state.suit + ".png' height='140px' width='100px' />")
})

// Draw whatever we need to the screen using JQuery, defaults to
// emptying contents before drawing
const drawOnScreen = (whatHtml, where, how) => {
  ( how === 'append' && $(where).append(whatHtml)) || $(where).empty().
      append(whatHtml);
}

const setDiv = (divName) => (divType) => {
  return '#' + divName + '-' + divType;
}

const addCard = (cardObject, divName) => {
  const pointsDiv = setDiv(divName)('points');
  const cardsDiv = setDiv(divName)('hand');
  this.cardArray.push(cardObject);
  drawOnScreen(getImageUrl(cardObject.point)(cardObject.suit), cardsDiv, 'append');
  this.points = calculatePoints(this.cardArray);
  drawOnScreen(this.points.toString(), pointsDiv, 'replace');
  return this.cardArray;
}

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
const busted = (cardHand) => { return (cardHand.points > 21 ? true : false); }

// blackjack
const blackjack = (cardHand) => {
  return (cardHand.points === 21 ? true : false);
}

//Dealer stays condition
const dealerMaxReached = (cardHand) => {
  return (cardHand.points >= 17 ? true : false);
}

//Forced win
const playerWon = (playerPoints, dealerPoints) => {
  return ((dealerPoints >= 17 ? true : false)
      && (playerPoints > dealerPoints ? true : false));
}