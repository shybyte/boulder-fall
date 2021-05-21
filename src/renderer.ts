import {TileMap} from './tilemap.js';
import {Tile} from './tiles.js';

const TILE_SIZE = 32;

const TILE_COLOR: Record<Tile, string> = {
  [Tile.AIR]: 'white',
  [Tile.FLUX]: '#ccffcc',
  [Tile.UNBREAKABLE]: '#999999',
  [Tile.PLAYER]: '#ff0000',
  [Tile.STONE]: '#0000cc',
  [Tile.BOX]: '#8b4513',
  [Tile.KEY1]: '#ffcc00',
  [Tile.LOCK1]: '#ffcc00',
  [Tile.KEY2]: '#00ccff',
  [Tile.LOCK2]: '#00ccff',
}

export class TileMapRenderer {
  private canvasContext: CanvasRenderingContext2D;

  constructor() {
    const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement;
    this.canvasContext = canvas.getContext('2d')!;
  }

  renderTileMap(tileMap: TileMap) {
    tileMap.forEachTile((tile, pos) => {
      this.canvasContext.fillStyle = TILE_COLOR[tile];
      this.canvasContext.fillRect(pos.x * TILE_SIZE, pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
  }
}

