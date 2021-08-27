export const {floor, pow, round, min, max, sqrt, abs, exp, PI, atan2, sin, cos} = Math;

export function hyp(a: number, b: number): number {
  return sqrt(pow2(a) + pow2(b));
}

export function pow2(x: number): number {
  return x * x;
}
