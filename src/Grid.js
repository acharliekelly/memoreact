/**
 * Grid (non-react pojo)
 * Properties:
 *  size: int total cards
 *  rows: int
 *  columns: int
 */
export default class Grid {
  constructor (rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.size = rows * columns;
    this.name = rows + 'x' + columns;
    this.listView = rows + ' x ' + columns;
  }

  toString = () => {
    return this.listView;
  }

  static parse = (str) => {
    const parts = str.split('x');
    const rows = parseInt(parts[0]);
    const cols = parseInt(parts[1]);
    return new Grid(rows, cols);
  }
};

export const GridOptions = {
  '2x2': new Grid(2, 2),
  '2x4': new Grid(2, 4),
  '3x3': new Grid(3, 3),
  '3x6': new Grid(3, 6),
  '4x4': new Grid(4, 4),
  '4x8': new Grid(4, 8),
  '5x5': new Grid(5, 5),
  '6x6': new Grid(6, 6)
};

export const Grids = [
  new Grid(2, 2),
  new Grid(2, 4),
  new Grid(3, 3),
  new Grid(3, 6),
  new Grid(4, 4),
  new Grid(4, 8),
  new Grid(5, 5),
  new Grid(6, 6)
];
