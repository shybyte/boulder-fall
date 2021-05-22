import {FALLING_TILES, LOCK_BY_KEY, Tile, TileMap} from './tiles.js';
import {addPositionDelta, assertUnreachable, Position, PositionDelta} from './utils/utils.js';

export const enum Movement {
  up = 'up',
  left = 'left',
  right = 'right',
  down = 'down'
}

const PositionDeltaByMovement: Record<Movement, PositionDelta> = {
  up: {xd: 0, yd: -1,},
  down: {xd: 0, yd: 1,},
  left: {xd: -1, yd: 0,},
  right: {xd: 1, yd: 0}
};

function moveTile(tileMap: TileMap, currentPos: Position, nextPos: Position): void {
  tileMap.set(nextPos, tileMap.get(currentPos))
  tileMap.set(currentPos, Tile.AIR)
}

export function movePlayer(tileMap: TileMap, movement: Movement): void {
  const playerPos = tileMap.find(Tile.PLAYER)!;
  const posDelta = PositionDeltaByMovement[movement];
  const newPlayerPos = addPositionDelta(playerPos, posDelta);
  const tileAtNewPlayerPos = tileMap.get(newPlayerPos);
  const movePlayerReally = () => moveTile(tileMap, playerPos, newPlayerPos);

  switch (tileAtNewPlayerPos) {
    case Tile.BOX:
    case Tile.STONE:
      if (movement === Movement.left || movement === Movement.right) {
        const behindNewPlayerPos = addPositionDelta(newPlayerPos, posDelta);
        const tileBehindNewPlayerPos = tileMap.get(behindNewPlayerPos);
        if (tileBehindNewPlayerPos === Tile.AIR) {
          moveTile(tileMap, newPlayerPos, behindNewPlayerPos);
          movePlayerReally();
        }
      }
      break;

    case Tile.KEY1:
    case Tile.KEY2: {
      const lockPos = tileMap.find(LOCK_BY_KEY[tileAtNewPlayerPos]);
      if (lockPos) {
        tileMap.set(lockPos, Tile.AIR);
      }
      movePlayerReally();
      break;
    }

    case Tile.AIR:
    case Tile.FLUX:
      movePlayerReally();
      break;

    case Tile.WALL:
    case Tile.LOCK1:
    case Tile.LOCK2:
    case Tile.PLAYER:
      break;

    default:
      assertUnreachable(tileAtNewPlayerPos);
  }
}

export function letTilesFallDown(tileMap: TileMap): void {
  tileMap.forEach((tile, pos) => {
    const posBelow = addPositionDelta(pos, PositionDeltaByMovement.down);
    if (FALLING_TILES.includes(tile) && tileMap.get(posBelow) === Tile.AIR) {
      moveTile(tileMap, pos, posBelow);
    }
  });
}
