export const {floor, pow, round, min, max, sqrt, abs, exp, PI, atan2, sin, cos} = Math;

const RAD = 180 / PI;
const DEG = PI / 180;

export function hyp(a: number, b: number): number {
  return sqrt(a * a + b * b);
}

export function pow2(n: number): number {
  return n * n;
}

export function deg(n: number): number {
  return n * RAD;
}

export function rad(n: number): number {
  return n * DEG;
}

/**
 * Linear polynomial interpolation.
 */
export function lerp(t: number, a: number, b: number): number {
  return a + t * (b - a);
}

export function clamp(x: number, a: number, b: number): number {
  return max(a, min(x, b));
}
