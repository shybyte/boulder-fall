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

export function waitForAnimationFrame(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => resolve());
  });
}

export function deepClone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x));
}

export function assertUnreachable(x: never): never {
  throw new Error(`Didn't expect to get "${x}" here`);
}
