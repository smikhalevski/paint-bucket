/**
 * Clamps value to [0, 1] range. `NaN` values are converted to 0.
 */
export function clamp(x: number): number {
  x = +x;
  return x >= 0 ? (x <= 1 ? x : 1) : 0;
}
