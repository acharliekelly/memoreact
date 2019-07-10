/**
 * Deck (non-react pojo)
 * Properties:
 *  name: name of deck
 *  max: number of unique cards. Deck will contain 2x this number
 *  cards: int array
 */
export default class Deck {
  constructor (deckName, maxSize) {
    this.name = deckName;
    this.max = maxSize;
    this.listView = `${deckName} (${maxSize})`;
    this.cards = [];
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
    if (size > this.max * 2) {
      const diff = size - this.max * 2;
      this.cards.push(this.cards.slice(0, diff));
      return this.cards;
    } else {
      return this.cards.slice(0, size);
    }
  }

  // return shuffled cards
  shuffle = () => {
    if (!this.isLoaded()) {
      this.initialize(this.max);
    }
    this.cards.sort(() => Math.random() - 0.5);
  }

  toString = () => {
    let str = this.name + ' (' + this.max + ')';
    str += ' [';
    for (let i = 0; i < this.cards.length; i++) {
      str += this.cards[i] + ',';
    }
    str += ']';
    return str;
  }
}

export const Decks = [
  new Deck('Base', 8),
  new Deck('Colors', 8),
  new Deck('ExtColors', 16),
  new Deck('Romanov', 16),
  new Deck('Shapes', 16)
];

export const deckSelector = deckName => {
  let deck;
  switch (deckName) {
  case 'Colors':
    deck = new Deck('Colors', 8);
    break;
  case 'ExtColors':
    deck = new Deck('ExtColors', 16);
    break;
  case 'Romanov':
    deck = new Deck('Romanov', 16);
    break;
  case 'Shapes':
    deck = new Deck('Shapes', 16);
    break;
  default:
    deck = new Deck('Base', 8);
  };
  deck.initialize(deck.max);
  deck.shuffle();
  return deck;
};
