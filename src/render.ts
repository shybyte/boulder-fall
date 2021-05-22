import {Tile, TileMap} from './tiles.js';

const TILE_SIZE = 32;

const TILE_COLOR: Record<Tile, string> = {
  [Tile.AIR]: '#ffffff',
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

export function renderTileMap(tileMap: TileMap) {
  const canvasContext = (document.getElementById('GameCanvas') as HTMLCanvasElement).getContext('2d')!;

  tileMap.forEach((tile, pos) => {
    canvasContext.fillStyle = TILE_COLOR[tile];
    canvasContext.fillRect(pos.x * TILE_SIZE, pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  });
}
