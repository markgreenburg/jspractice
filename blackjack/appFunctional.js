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



function hand() {
  return {
    cardArray: [],
    addCard: function(cardObject) {
      return cardArray.push(cardObject);
    }
  };
}

function deck() {
  return {
    cardsLeft: 52,
    suits: ["diamonds", "spades", "hearts", "clubs"],
    points: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    cardArray: []
  }
}




