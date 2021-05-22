import {deepClone, Position} from './utils.js';

export class Array2D<T> {
  private readonly data: T[][];

  constructor(data: T[][]) {
    this.data = deepClone(data);
  }

  public get width() {
    return this.data[0].length;
  }

  public get height() {
    return this.data.length;
  }

  set(pos: Position, element: T) {
    this.data[pos.y][pos.x] = element;
  }

  get(pos: Position): T {
    return this.data[pos.y][pos.x];
  }

  find(searchedT: T): Position | undefined {
    let pos;
    this.forEach((element, posT) => {
      if (element === searchedT) {
        pos = posT;
      }
    });
    return pos;
  }

  forEach(callback: (el: T, pos: Position) => void) {
    this.data.forEach((row, y) => {
      row.forEach((el, x) => {
        ((el, x, y) => callback(el, {x, y}))(el, x, y);
      });
    });
  }
}
