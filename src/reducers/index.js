import { RESTART_GAME, CHANGE_DECK } from '../action/index';

const initialState = {
  timer: 0,
  moves: 0,
  deck: 'base'
};

export default function gameApp (state = initialState, action) {
  switch (action.type) {
  case CHANGE_DECK:
    return Object.assign({}, state, {
      deck: action.deck
    });
  case RESTART_GAME:
    return initialState;
  default:
    // return initial state
    return state;
  }
}
