import {MAP_LEVEL1} from './levels.js';
import {Movement, MOVEMENTS_BY_KEY, PositionDeltaByMovement} from './player_movements.js';
import {TileMapRenderer} from './renderer.js';
import {FALLING_TILES, Tile, TileMap} from './tiles.js';
import {deepClone, forEach2D, Position, waitForAnimationFrame} from './utils.js';

function getTilePos(tileMap: TileMap, searchedTile: Tile): Position | undefined {
  let pos;
  forEach2D(tileMap, (tile, x, y) => {
    if (tile === searchedTile) {
      pos = {x, y};
    }
  });
  return pos;
}

function moveTile(tileMap: TileMap, currentPos: Position, nextPos: Position) {
  tileMap[nextPos.y][nextPos.x] = tileMap[currentPos.y][currentPos.x];
  tileMap[currentPos.y][currentPos.x] = Tile.AIR;
}

function movePlayer(tileMap: TileMap, movement: Movement) {
  const playerPos = getTilePos(tileMap, Tile.PLAYER)!;
  const posDelta = PositionDeltaByMovement[movement];
  const newPlayerPos: Position = {x: playerPos.x + posDelta.xd, y: playerPos.y + posDelta.yd};
  const tileAtNewPlayerPos = tileMap[newPlayerPos.y][newPlayerPos.x];

  const behindNewPlayerPos: Position = {x: playerPos.x + 2 * posDelta.xd, y: playerPos.y + 2 * posDelta.yd};
  const tileBehindNewPlayerPos = tileMap[behindNewPlayerPos.y][behindNewPlayerPos.x];

  switch (tileAtNewPlayerPos) {
    case Tile.BOX:
    case Tile.STONE:
      if (movement === Movement.left || movement === Movement.right) {
        if (tileBehindNewPlayerPos === Tile.AIR) {
          moveTile(tileMap, newPlayerPos, behindNewPlayerPos);
          moveTile(tileMap, playerPos, newPlayerPos);
        }
      }
      break;
    case Tile.KEY1:
    case Tile.KEY2:
      const lockPos = getTilePos(tileMap, tileAtNewPlayerPos + 1);
      if (lockPos) {
        tileMap[lockPos.y][lockPos.x] = Tile.AIR;
      }
      moveTile(tileMap, playerPos, newPlayerPos);
      break;
    case Tile.AIR:
    case Tile.FLUX:
      moveTile(tileMap, playerPos, newPlayerPos);
      break;
    case Tile.UNBREAKABLE:
  }
}

function updateMap(tileMap: TileMap) {
  forEach2D(tileMap, (tile, x, y) => {
    const yBelow = y + 1;
    if (FALLING_TILES.includes(tile) && tileMap[yBelow][x] === Tile.AIR) {
      moveTile(tileMap, {x, y}, {x, y: yBelow});
    }
  });
}

function isFinished(tileMap: TileMap) {
  const width = tileMap[0].length;
  const height = tileMap.length;
  return tileMap[height - 2][width - 2] === Tile.BOX;
}

async function main() {
  const mapRenderer = new TileMapRenderer();
  const tileMap = deepClone(MAP_LEVEL1);

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
