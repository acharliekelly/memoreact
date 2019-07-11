// LayoutGrid (pojo)
export default class LayoutGrid {
  constructor (gridSize) {
    this.name = gridSize;
    const parts = gridSize.split('x');
    this.rows = parseInt(parts[0]);
    this.columns = parseInt(parts[1]);
    this.size = this.rows * this.columns;
    this.listView = gridSize.replace(/x/, ' x ');
  }
}

export const GridsList = [
  new LayoutGrid('2x2'),
  new LayoutGrid('4x4'),
  new LayoutGrid('4x8')
];
