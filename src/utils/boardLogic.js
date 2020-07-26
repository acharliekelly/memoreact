import { decks } from './deck.json';

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

export const getDeck = deckId => {
  return decks[deckId];
}

export const GameTile = (cardVal = 0) => ({
  value: cardVal,
  flipped: false,
  matched: false
});

/**
 * The shape of State
 */
export const initialState = {
  deckId: DEFAULT_DECK,
  deck: {},
  gridSize: DEFAULT_GRID,
  moves: 0,
  matches: 0,
  tiles: [],  // { value: int, flipped: bool, matched: bool }
  secondFlip: false,
  gameOver: false,
  timer: null
};

/**
 * get array of tiles { value: int, flipped: bool, matched: bool }
 * @param {String} gridSize the size of the board, eg '2x2'
 */
export const initTiles = gridSize => {
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

export const initGame = (deckId = DEFAULT_DECK, gridSize = DEFAULT_GRID) => {
  return Object.assign({}, initialState, {
    tiles: initTiles(gridSize),
    deck: getDeck(deckId)
  })
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

export const getDeckCls = deckId => {
  return `game-board ${deckId}`;
}

export const getCardCls = cardValue => {
  return `card card-${cardValue}`
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

// No Mutation - dispatched by reducer
export const noMatchFound = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    if (item.flipped && !item.matched) item.flipped = false
  });
  return items;
}

// No Mutation - dispatched by reducer
export const matchFound = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    item.matched = item.flipped;
  });
  return items;
}


export const getCloudFace = (deck, cardValue) => {
  const image = deck.faces[cardValue];
  return getCloudImageUrl(deck.id, image, deck.imgWidth);
}

export const getCloudBack = deck => {
  return getCloudImageUrl(deck.id, deck.cardBack, deck.imgWidth);
}

const getCloudImageUrl = (deckId, imageId, width = 100) => {
  return `https://res.cloudinary.com/cantimaginewhy/w_${width}/memory/decks/${deckId}/${imageId}`;
}

export const getCardStyle = (deck, tile) => {
  return tile.flipped ?
    getCardFrontStyle(deck, tile) : getCardBackStyle(deck);
}

export const getCardFrontStyle = (deck, tile) => {
  const style = Object.assign({}, deck.cardStyle);
  style.opacity = tile.matched ? 0.7 : 1;
  
  if (deck.hasImages) {
    // images
    const img = getCloudFace(deck, tile.value);
    style.backgroundColor = deck.background;
    style.backgroundImage = `url(${img})`;
  } else {
    // color
    style.backgroundColor = deck.faces[tile.value];
  }
  return style;
}

export const getCardBackStyle = deck => {
  // show back
  const style = Object.assign({}, deck.cardStyle);
  if (deck.cardBack.startsWith('#')) {
    style.backgroundColor = deck.cardBack;
  } else {
    // cardBack is image
    const img = getCloudBack(deck);
    style.backgroundColor = deck.background;
    style.backgroundImage = `url(${img}`;
  }
  return style;
}
