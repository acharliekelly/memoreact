import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class GameActions {
  resizeBoard (grid) {
    Dispatcher.dispatch({
      actionType: ActionTypes.RESIZE_BOARD,
      payload: grid
    });
  }

  changeDeck (deck) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CHANGE_DECK,
      payload: deck
    });
  }

  restartGame () {
    Dispatcher.dispatch({
      actionType: ActionTypes.RESTART_GAME
    });
  }
}

export default new GameActions();
