import { combineReducers } from 'redux';
import { gameReducer } from './game';
import { boardReducer } from './board';

const rootReducer = combineReducers(
  boardReducer,
  gameReducer
);

export default rootReducer;