import {Tile} from './tiles.js';
import {deepClone, forEach2D, Position} from './utils.js';

export type TileMapData = Tile[][];

export class TileMap {
  private readonly data: TileMapData;

  constructor(data: TileMapData) {
    this.data = deepClone(data);
  }

  public get width() {
    return this.data[0].length;
  }

  public get height() {
    return this.data.length;
  }

  setTile(pos: Position, tile: Tile) {
    this.data[pos.y][pos.x] = tile;
  }

  getTile(pos: Position): Tile {
    return this.data[pos.y][pos.x];
  }

  getTilePos(searchedTile: Tile): Position | undefined {
    let pos;
    this.forEachTile((tile, posTile) => {
      if (tile === searchedTile) {
        pos = posTile;
      }
    });
    return pos;
  }

  forEachTile(callback: (el: Tile, pos: Position) => void) {
    forEach2D(this.data, (el, x, y) => callback(el, {x, y}));
  }

  moveTile(currentPos: Position, nextPos: Position) {
    this.setTile(nextPos, this.getTile(currentPos))
    this.setTile(currentPos, Tile.AIR)
  }
}
