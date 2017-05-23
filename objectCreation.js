/**
 * Simple example of 'this' binding in JavaScript
 */

const randomAnimal = {
  name: 'monkey',
  sound: "eek eek hoo hoo hoo oo oo oo",
  speak: function() {
    console.log(this.sound);
  }
}

randomAnimal.speak();

randomAnimal2 = {
  name: 'chimp',
  sound: 'Chimps can speak English!',
  speak: randomAnimal.speak,
}
randomAnimal2.speak();