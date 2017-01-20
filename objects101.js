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

// You will implement the rest of these exercises using Test-Driven Development.
// Create a constructor Card. A card object will have 2 properties:
// point - the point value of the card: a number between 1 and 13.
// suit - the suit of the card: one of diamonds, clubs, hearts and spades.
Card = function(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getImageUrl = function() {
    return '/images/' + this.point + '_of_' + this.suit + '.png';
}

Hand = function() {
  this.cardArray = [];
}

Hand.prototype.addCard = function(cardObject) {
  this.cardArray.push(cardObject);
  return this.cardArray;
}

Deck = function() {
  this.cardsLeft = 52;
  const suits = ["diamonds", "spades", "hearts", "clubs"];
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  this.cardArray = [];
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

///////////
// Debug //
///////////
const newDeck = new Deck();
console.log("New Deck of cards: ");
console.log(newDeck.cardArray);
console.log("Shuffling...");
newDeck.shuffle();
console.log("Shuffled deck: ");
console.log(newDeck.cardArray);
console.log("Getting a new card...5 of diamonds");
const newCard = new Card(5, "diamonds");
console.log(newCard);
console.log("Printing image path...");
console.log(newCard.getImageUrl());
console.log("Getting a new hand...");
const newHand = new Hand();
console.log(newHand);
console.log("Adding the card to our hand...")
console.log(newHand.addCard(newCard));
console.log("Hand is now: ")
console.log(newHand);


