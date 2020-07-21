import { combineReducers } from 'redux';
import * as ACTIONS from '../actions/actionTypes';

const DEFAULT_DECK = 'base';
const DEFAULT_GRID_SIZE = 4;

const initialState = {
  deck: DEFAULT_DECK,
  gridSize: DEFAULT_GRID_SIZE,
  moves: 0,
  matches: 0,
  tiles: [],  // { value: int, flipped: bool, matched: bool } 
  gameOver: false
};

// Grid size must be even
const initBoard = gridSize => {
  const boardSize = gridSize ^ 2;
  const values = boardSize / 2;
  const tiles = [];
  for (let i=0; i<values; i++) {
    const tile = {
      value: i,
      flipped: false,
      matched: false
    };
    tiles.push(tile, tile);
  }
  return shuffle(tiles);
}

// Mutates
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const isMatched = tiles => {
  const flipped = tiles.filter(tile => tile.flipped);
  if (flipped.length === 2) {
    return flipped[0].value === flipped[1].value;
  }
  return false;
}

// No Mutation
const noMatchFound = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    item.flipped = false
  });
  return items;
}

// No Mutation
const matchFound = tiles => {
  const items = Array.from(tiles);
  items.forEach(item => {
    item.matched = item.flipped;
  });
  return items;
}

const initialize = (size = DEFAULT_GRID_SIZE) => {
  return Object.assign({}, initialState, {
    gridSize: size,
    tiles: initBoard(size)
  })
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_DECK:
      return Object.assign({}, state, {
        deck: action.deck
      });
    case ACTIONS.RESIZE_GRID: {
      // automatically resets game
      return initialize(action.gridSize);
    }
    default:
      return state;
  }
};

const gameReducer = (state = initialState, action) => {
  const { tiles, moves, matches, gridSize } = state;
  switch (action.type) {
    case ACTIONS.RESTART_GAME:
      return initialize(gridSize);
    case ACTIONS.FLIP_CARD:
      const items = Array.from(tiles);
      items[action.index].flipped = true;
      return Object.assign({}, state, {
        tiles: items
      });
    case ACTIONS.CHECK_MATCH:
      const nMoves = moves + 1;
      let nMatches = matches;
      let nTiles;
      if (isMatched(state)) {
        nMatches += 1;
        nTiles = matchFound(tiles);
      } else {
        nTiles = noMatchFound(tiles);
      }
      return Object.assign({}, state, {
        moves: nMoves,
        matches: nMatches,
        tiles: nTiles
      })
    case ACTIONS.SHOW_WIN:
      const won = tiles.every(tile => tile.matched);
      return Object.assign({}, state, {
        gameOver: won
      });
    default:
      return state;
  }
};

const memoryApp = combineReducers(
  boardReducer,
  gameReducer
);

export default memoryApp;