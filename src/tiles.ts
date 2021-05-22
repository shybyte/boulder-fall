import {Array2D} from './utils/array2d.js';

export enum Tile {
  AIR = 0,
  FLUX = 1,
  UNBREAKABLE = 2,
  PLAYER = 3,
  STONE = 4,
  BOX = 6,
  KEY1 = 8, LOCK1 = 9,
  KEY2 = 10, LOCK2 = 11
}

export const FALLING_TILES = [Tile.STONE, Tile.BOX];

export const LOCK_BY_KEY = {
  [Tile.KEY1]: Tile.LOCK1,
  [Tile.KEY2]: Tile.LOCK2
}

export type TileMap = Array2D<Tile>
