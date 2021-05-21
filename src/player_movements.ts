export const enum Movement {
  up = 'up',
  left = 'left',
  right = 'right',
  down = 'down'
}

export type PositionDelta = { xd: number, yd: number; };

export const PositionDeltaByMovement: Record<Movement, PositionDelta> = {
  up: {xd: 0, yd: -1,},
  down: {xd: 0, yd: 1,},
  left: {xd: -1, yd: 0,},
  right: {xd: 1, yd: 0}
};

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
