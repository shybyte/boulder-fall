export interface Position {
  x: number,
  y: number
}

export type PositionDelta = { xd: number, yd: number; };

export function addPositionDelta(position: Position, delta: PositionDelta): Position {
  return {
    x: position.x + delta.xd,
    y: position.y + delta.yd,
  };
}

export function waitForAnimationFrame() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(resolve);
  })
}

export function deepClone(x: unknown) {
  return JSON.parse(JSON.stringify(x));
}

export function forEach2D<T>(array: T[][], callback: (el: T, x: number, y: number) => void) {
  array.forEach((row, y) => {
    row.forEach((el, x) => {
      callback(el, x, y);
    });
  });
}

export function assertUnreachable(x: never): never {
  throw new Error(`Didn't expect to get "${x}" here`);
}
