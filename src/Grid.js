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
  }

  toString = () => {
    return `${this.rows}x${this.columns}`;
  }

  static parseGrid = (str) => {
    const parts = str.split('x');
    const rows = parseInt(parts[0]);
    const cols = parseInt(parts[1]);
    return new Grid(rows, cols);
  }
};
