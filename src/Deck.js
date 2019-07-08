/**
 * Deck (non-react pojo)
 * Properties:
 *  name: name of deck
 *  max: number of unique cards. Deck will contain 2x this number
 *  cards: int array
 */
class Deck {
  constructor (deckName, maxSize) {
    this.name = deckName;
    this.max = maxSize;
    this.cards = [];

    this.shuffle = this.shuffle.bind(this);
    this.initialize = this.initialize.bind(this);
    this.getStack = this.getStack.bind(this);
    this.isLoaded = this.isLoaded.bind(this);
    this.toString = this.toString.bind(this);
  }

  // populate cards with 0 to size, twice
  initialize = size => {
    this.cards = [];
    for (let i = 0; i < size; i++) {
      this.cards.push(i);
      this.cards.push(i);
    }
  }

  isLoaded = () => {
    return this.cards.length > 0;
  }

  // return some cards
  getStack = size => {
    return this.cards.slice(0, size);
  }

  // return shuffled cards
  shuffle = () => {
    if (!this.isLoaded()) {
      this.initialize(this.size);
    }
    this.cards.sort(() => Math.random() - 0.5);
  }

  toString = () => {
    let str = this.name + ' (' + this.size + ')';
    str += ' [';
    for (let i = 0; i < this.cards.length; i++) {
      str += this.cards[i] + ',';
    }
    str += ']';
    return str;
  }
}

export default Deck;

export const deckSelector = deckName => {
  let deck;
  switch (deckName.toLowerCase()) {
  case 'colors':
    deck = new Deck('Colors', 8);
    break;
  case 'romanov':
    deck = new Deck('Romanov', 16);
    break;
  case 'shapes':
    deck = new Deck('Shapes', 16);
    break;
  default:
    deck = new Deck('Base', 8);
  };
  deck.initialize(deck.max);
  deck.shuffle();
  return deck;
};
