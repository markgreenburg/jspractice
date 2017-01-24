'use strict';
// Card factory
const card = (point, suit) => {
  let cardProperties = {
    point,
    suit
  }
  return Object.assign(
    {},
    imageGetter(cardProperties)
  )
}

const imageGetter = (properties) => ({
  getImageUrl: () => 'images/' + properties.point
      + '_of_' + properties.suit + '.png'
})

const hand = () => {
  let {
    cardArray: []
  }
  return Object.assign(
}

const setDiv = (divName) => (divType) => {
  '#' + divName + '-' + divType;
}

const addCard = (cardObject, divName) => ({
  addCard: (cardObject, divName) => {
    const setPerson = setDiv(divName);
    const pointsDiv = setPerson('-points');
    const cardsDiv = setPerson('-hand');
    this.cardArray.push(cardObject);
    drawOnScreen(cardObject.getImageUrl(), cardsDiv, 'append');
    this.points = calculatePoints(this.cardArray);
    drawOnScreen(this.points.toString(), pointsDiv, 'replace');
    return this.cardArray;
  }
})



function deck() {
  return {
    cardsLeft: 52,
    suits: ["diamonds", "spades", "hearts", "clubs"],
    points: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    cardArray: []
  }
}




