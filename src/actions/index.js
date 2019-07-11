import Dispatcher from '../dispatcher';
import ActionTypes from '../constants';

class GameActions {
  startGame (options) {
    Dispatcher.dispatch({
      actionType: ActionTypes.START_GAME,
      payload: options
    });
  }
}

export default new GameActions();
