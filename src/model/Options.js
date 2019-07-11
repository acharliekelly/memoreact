/*
 * GameOptions (pojo)
 *  - gridSize: string, '4x4'
 */
const DEFAULT_GRID = '4x4';
const DEFAULT_DECK = 'Colors';

export default class Options {
  constructor (gridName, deckTheme) {
    this.theme = deckTheme;
    this.grid = gridName;
    const rc = gridName.split('x');
    this.rows = parseInt(rc[0]);
    this.columns = parseInt(rc[1]);
  }

  getBoardSize = () => {
    return this.rows * this.columns;
  }

  static defaultOptions = () => {
    return new Options(DEFAULT_GRID, DEFAULT_DECK);
  }
}
