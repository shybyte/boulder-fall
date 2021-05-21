import {MAP_LEVEL1} from './levels.js';
import {Movement, MOVEMENTS_BY_KEY, PositionDeltaByMovement} from './player_movements.js';
import {TileMapRenderer} from './renderer.js';
import {TileMap} from './tilemap.js';
import {FALLING_TILES, Tile} from './tiles.js';
import {addPositionDelta, assertUnreachable, waitForAnimationFrame} from './utils.js';

function movePlayer(tileMap: TileMap, movement: Movement) {
  const playerPos = tileMap.getTilePos(Tile.PLAYER)!;
  const posDelta = PositionDeltaByMovement[movement];
  const newPlayerPos = addPositionDelta(playerPos, posDelta) ;
  const tileAtNewPlayerPos = tileMap.getTile(newPlayerPos);

  switch (tileAtNewPlayerPos) {
    case Tile.BOX:
    case Tile.STONE:
      if (movement === Movement.left || movement === Movement.right) {
        const behindNewPlayerPos = addPositionDelta(newPlayerPos, posDelta);
        const tileBehindNewPlayerPos = tileMap.getTile(behindNewPlayerPos);
        if (tileBehindNewPlayerPos === Tile.AIR) {
          tileMap.moveTile(newPlayerPos, behindNewPlayerPos);
          tileMap.moveTile(playerPos, newPlayerPos);
        }
      }
      break;

    case Tile.KEY1:
    case Tile.KEY2:
      const lockPos = tileMap.getTilePos(tileAtNewPlayerPos + 1);
      if (lockPos) {
        tileMap.setTile(lockPos, Tile.AIR);
      }
      tileMap.moveTile(playerPos, newPlayerPos);
      break;

    case Tile.AIR:
    case Tile.FLUX:
      tileMap.moveTile(playerPos, newPlayerPos);
      break;

    case Tile.UNBREAKABLE:
    case Tile.LOCK1:
    case Tile.LOCK2:
    case Tile.PLAYER:
      break;

    default:
      assertUnreachable(tileAtNewPlayerPos);
  }
}

function updateMap(tileMap: TileMap) {
  tileMap.forEachTile((tile, pos) => {
    const posBelow = addPositionDelta(pos, PositionDeltaByMovement.down);
    if (FALLING_TILES.includes(tile) && tileMap.getTile(posBelow) === Tile.AIR) {
      tileMap.moveTile(pos, posBelow);
    }
  });
}

function isFinished(tileMap: TileMap) {
  return tileMap.getTile({x: tileMap.width - 2, y: tileMap.height - 2}) === Tile.BOX;
}

async function main() {
  const mapRenderer = new TileMapRenderer();
  const tileMap = new TileMap(MAP_LEVEL1);

  window.addEventListener('keydown', e => {
    const movement = MOVEMENTS_BY_KEY[e.key];
    if (movement) {
      movePlayer(tileMap, movement);
    }
  });

  while (!isFinished(tileMap)) {
    updateMap(tileMap);
    await waitForAnimationFrame();
    mapRenderer.renderTileMap(tileMap);
  }

  console.log('Finished');
}

main().catch((error) => {
  console.error('Error', error);
});
