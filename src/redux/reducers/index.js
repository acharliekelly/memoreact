import * as ACTIONS from '../actions/actionTypes';
import { 
  initTiles,
  initialState,
  isMatched,
  matchFound,
  noMatchFound,
  initGame,
  getDeck
} from '../../utils/boardLogic';


  const flip = (state, index) => {
    const { tiles } = state;
    return tiles.map((item, idx) => {
      if (idx !== index) {
        return item;
      } else {
        return Object.assign({}, item, {
          flipped: true
        })
      }
    })
  }
  
  // TODO: delay for 1500 ms
  const afterSecondFlip = (state) => {
    const { tiles } = state;
    const { moves, matches } = state;
    let nMoves = moves;
    let nMatches = matches;
    let aTiles = [];
    if (tiles.some(tile => tile.flipped)) {
      nMoves += 1;
    }
    if (isMatched(tiles)) {
      nMatches += 1;
      aTiles = matchFound(tiles);
    } else {
      nMatches = matches;
      aTiles = noMatchFound(tiles);
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
  
  const reducer = (state = initialState, action) => {
    const { secondFlip } = state;
    switch (action.type) {

      case ACTIONS.START_GAME:
        return initGame(action.deckId, action.gridSize);

      case ACTIONS.CHANGE_DECK:
        return Object.assign({}, state, {
          deckId: action.deckId,
          deck: getDeck(action.deckId)
        });

      case ACTIONS.RESIZE_GRID:
        // automatically resets game
        return Object.assign({}, state, {
          gridSize: action.gridSize,
          tiles: initTiles(action.gridSize)
        });

      case ACTIONS.RESTART_GAME:
        return initGame(state.deckId, state.gridSize);

      case ACTIONS.FLIP_CARD:
        const items = flip(state, action.index);
        if (!secondFlip) {
          // first flip
          return Object.assign({}, state, {
            tiles: items,
            secondFlip: true
          })
        } else {
          // second flip
          return Object.assign({}, state, {
            tiles: items,
            secondFlip: false
          })
        }

      case ACTIONS.CHECK_MATCH:
        return afterSecondFlip(state);

      case ACTIONS.SHOW_WIN:
        return checkWin(state);

      default:
        return state;
    }
  };

export default reducer;