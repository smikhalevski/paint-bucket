export const {floor, pow, round, min, max, sqrt, abs, exp, PI, atan2, sin, cos} = Math;

export function hyp(a: number, b: number): number {
  return sqrt(pow2(a) + pow2(b));
}

export function pow2(n: number): number {
  return n * n;
}

/**
 * Maps n ∈ [a1, b1] to [a2, b2]. Ranges can be inverse.
 */
export function mapRange(n: number, a1: number, b1: number, a2: number, b2: number): number {
  return a2 + (b2 - a2) * (n - a1) / (b1 - a1);
}
