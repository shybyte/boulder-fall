import {MAP_LEVEL1} from './levels.js';
import {Movement, movePlayer, letTilesFallDown} from './move-tiles.js';
import {renderTileMap} from './render.js';
import {Tile, TileMap} from './tiles.js';
import {Array2D} from './utils/array2d.js';
import {waitForAnimationFrame} from './utils/utils.js';

export const MOVEMENTS_BY_KEY: Record<string, Movement> = {
  ArrowDown: Movement.down,
  s: Movement.down,
  ArrowUp: Movement.up,
  w: Movement.up,
  ArrowLeft: Movement.left,
  a: Movement.left,
  ArrowRight: Movement.right,
  d: Movement.right,
};

function isFinished(tileMap: TileMap) {
  return tileMap.get({x: tileMap.width - 2, y: tileMap.height - 2}) === Tile.BOX;
}

async function main() {
  const tileMap = new Array2D(MAP_LEVEL1);

  window.addEventListener('keydown', e => {
    const movement = MOVEMENTS_BY_KEY[e.key];
    if (movement) {
      movePlayer(tileMap, movement);
    }
  });

  while (!isFinished(tileMap)) {
    letTilesFallDown(tileMap);
    await waitForAnimationFrame();
    renderTileMap(tileMap);
  }

  console.log('Finished');
}

main().catch((error) => {
  console.error('Error', error);
});
