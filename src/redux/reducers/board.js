import * as ACTIONS from '../actions/actionTypes';
import { initBoard, initialState } from '../../utils/boardLogic';

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_DECK:
      return Object.assign({}, state, {
        deck: action.deck
      });
    case ACTIONS.RESIZE_GRID: {
      // automatically resets game
      return Object.assign({}, initialState, {
        gridSize: action.gridSize,
        tiles: initBoard(action.gridSize)
      });
    }
    default:
      return state;
  }
};
