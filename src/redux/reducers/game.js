
import * as ACTIONS from '../actions/actionTypes';
import { 
  initialState,
  isMatched,
  matchFound,
  noMatchFound,
  initBoard
} from '../../utils/boardLogic';


const flip = (state, index) => {
  const items = Array.from(state.tiles);
  items[index].flipped = true;
  return Object.assign({}, state, {
    tiles: items
  })
}

const onFirstFlip = (state, action) => {
  const items = flip(state, action.index);
  return Object.assign({}, state, {
    tiles: items,
    secondFlip: true
  });
}

// TODO: delay for 1000 ms
const onSecondFlip = (state, action) => {
  const items = flip(state, action.index);
  const { moves, matches } = state;
  const nMoves = moves + 1;
  let nMatches, aTiles;
  if (isMatched(items)) {
    nMatches += 1;
    aTiles = matchFound(items);
  } else {
    nMatches = matches;
    aTiles = noMatchFound(items);
  }
  return Object.assign({}, state, {
    moves: nMoves,
    matches: nMatches,
    tiles: aTiles,
    secondFlip: false
  })
}

const checkWin = state => {
  const { tiles } = state;
  return Object.assign({}, state, {
    gameOver: tiles.every(tile => tile.matched)
  })
}


export const gameReducer = (state = initialState, action) => {
  const { gridSize, secondFlip } = state;
  switch (action.type) {
    case ACTIONS.RESTART_GAME:
      return initBoard(gridSize);
    case ACTIONS.FLIP_CARD:
      if (secondFlip) {
        return onSecondFlip(state, action);
      } else {
        return onFirstFlip(state, action);
      }
    case ACTIONS.CHECK_MATCH:
      return onSecondFlip(state, action);
    case ACTIONS.SHOW_WIN:
      return checkWin(state);
    default:
      return state;
  }
};
