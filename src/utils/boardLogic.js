import decks from './deck.json';
import * as SHAPES_IMGS from '../css/images/shapes/';
import * as ROMANOV_IMGS from '../css/images/romanov/';
import * as TECH_IMGS from '../css/images/tech/';

export const DEFAULT_DECK = 'colors';
export const DEFAULT_GRID = '4x4';

export const GridOptions = {
  '2x2': [2,2],
  '2x4': [2,4],
  '3x4': [3,4],
  '4x4': [4,4],
  '4x5': [4,5],
  '4x6': [4,6],
  '5x6': [5,6]
};

export const DeckOptions = decks;

export const GameTile = (cardVal = 0) => ({
  value: cardVal,
  flipped: false,
  matched: false
});

export const initialState = {
  deck: DeckOptions[DEFAULT_DECK],
  gridSize: DEFAULT_GRID,
  moves: 0,
  matches: 0,
  tiles: [],  // { value: int, flipped: bool, matched: bool }
  secondFlip: false,
  gameOver: false
};

/**
 * get array of tiles { value: int, flipped: bool, matched: bool }
 * @param {String} gridSize the size of the board, eg '2x2'
 */
export const initBoard = gridSize => {
  const [boardColumns, boardRows] = GridOptions[gridSize];
  const boardSize = boardColumns * boardRows;
  const values = boardSize / 2;
  const tiles = [];
  for (let i=0; i<values; i++) {
    const tile = new GameTile(i);
    // add 2 copies of each
    tiles.push(tile, tile);
  }
  return shuffle(tiles);
}


// Pure
const shuffle = array => {
  const newArray = Array.from(array);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

const getDeckImages = deckId => {
  let imgs;
  switch (deckId) {
    case 'shapes':
      imgs = SHAPES_IMGS;
      break;
    case 'romanov':
      imgs = ROMANOV_IMGS;
      break;
    case 'tech':
      imgs = TECH_IMGS;
      break;
    default:
      imgs = [];
  }
  return imgs;
}


export const getCardBackStyle = deckId => {
  // from css/images/deckId
  const back = decks[deckId].cardBack;
  const imgs = getDeckImages(deckId);
  if (back.startsWith('#')) {
    return {
      backgroundColor: back
    }
  } else {
    return {
      backgroundImage: imgs[back]
    }
  }
}

export const getCardFrontStyle = (deckId, cardValue, isMatched) => {
  const deck = decks[deckId];
  const imgs = getDeckImages(deckId);
  const value = deck.faces[cardValue];
  const style = {
    opacity: isMatched ? 0.7 : 1
  };
  if (!deck.images) {
    style.backgroundColor = deck.faces[cardValue]
  } else {
    style.backgroundColor = 'white';
    style.backgroundImage = imgs[value];
  }
  return style;
}


const flipped = tiles => {
  return tiles.filter(tile => tile.flipped && !tile.matched);
}
/**
 * return true if exactly 2 tiles are flipped
 * @param {Array} tiles array of objects {0, false, false}
 */
export const isSecondFlip = tiles => {
  return (flipped(tiles).length === 2);
}

/**
 * return true if exactly 2 tiles are flipped, and match
 * @param {Array} tiles array of objects {0, false, false}
 */
export const isMatched = tiles => {
  const fl = flipped(tiles);
  if (fl.length === 2) {
    return fl[0].value === fl[1].value;
  }
  return false;
}

// No Mutation - dispatched by gameReducer
export const noMatchFound = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    item.flipped = false
  });
  return items;
}

// No Mutation - dispatched by gameReducer
export const matchFound = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    item.matched = item.flipped;
  });
  return items;
}
