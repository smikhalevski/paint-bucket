import {sqrt} from './math-utils';

/**
 * Returns hypotenuse of the right triangle with `a` and `b` cathetus.
 */
export function hyp(a: number, b: number): number {
  return sqrt(pow2(a) + pow2(b));
}

export function pow2(x: number): number {
  return x * x;
}
