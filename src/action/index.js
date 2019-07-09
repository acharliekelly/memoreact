/*
 *  Action Types
 */

export const RESTART_GAME = 'RESTART_GAME';
export const CHANGE_DECK = 'CHANGE_DECK';
export const RESIZE_BOARD = 'RESIZE_BOARD';

/*
 * Action Creators
 */

export function retartGame () {
  return { type: RESTART_GAME };
}

export function changeDeck (deck) {
  return { type: CHANGE_DECK, deck };
}

export function resizeBoard (grid) {
  return { type: RESIZE_BOARD, grid };
}
