/**
 * @module utils
 */

import { Color } from './Color.js';
import { Accessor, Interpolator } from './types.js';

const { min, round } = Math;

/**
 * Creates the accessor callback that invokes getter of setter depending on the number of arguments.
 *
 * @param get The value getter.
 * @param set The value setter.
 * @template Output The value returned by the getter.
 * @template Input The value passed to the setter.
 */
export function createAccessor<Output, Input>(
  get: (color: Color) => Output,
  set: (color: Color, value: Input) => void
): Accessor<Output, Input> {
  return function (this: Color): any {
    if (arguments.length === 0) {
      return get(this);
    }

    const value = arguments[0];

    set(this, typeof value === 'function' ? value(get(this)) : value);

    return this;
  };
}

/**
 * Clamps value to [0, 1] range. `NaN` values are converted to 0.
 *
 * @param x The number to clamp.
 */
export function clamp(x: number): number {
  x = +x;
  return x >= 0 ? (x <= 1 ? x : 1) : 0;
}

/**
 * Normalizes the size of components in the 32-bit color integer.
 *
 * ```ts
 * normalizeColorInt(0x1, 1) // ⮕ 0x11_11_11_ff
 * normalizeColorInt(0x12, 2) // ⮕ 0x12_12_12_ff
 * normalizeColorInt(0x123, 3) // ⮕ 0x11_22_33_ff
 * normalizeColorInt(0x1234, 4) // ⮕ 0x11_22_33_44
 * normalizeColorInt(0x12345, 5) // ⮕ 0
 * normalizeColorInt(0x123456, 6) // ⮕ 0x12_34_56_ff
 * normalizeColorInt(0x1234567, 7) // ⮕ 0
 * normalizeColorInt(0x12345678, 8) // ⮕ 0x12_34_56_78
 * ```
 *
 * @param color The input color to normalize, ex. `0xff_ff_ff` for white in RGB space.
 * @param nibbleCount The number (1, 2, 3, 4, 6, or 8) of nibbles the input color.
 * @returns A valid 32-bit color integer.
 */
export function normalizeColorInt(color: number, nibbleCount: number): number {
  let a, b, c, d;

  switch (nibbleCount) {
    case 1:
      // 0x1 ⮕ 0x11_11_11_ff
      a = 0xf & color;
      a += a << 4;
      return composeColorInt32(a, a, a, 0xff);

    case 2:
      // 0x12 ⮕ 0x12_12_12_ff
      a = 0xff & color;
      return composeColorInt32(a, a, a, 0xff);

    case 3:
      // 0x123 ⮕ 0x11_22_33_ff
      a = 0xf & (color >>> 8);
      b = 0xf & (color >>> 4);
      c = 0xf & color;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      return composeColorInt32(a, b, c, 0xff);

    case 4:
      // 0x1234 ⮕ 0x11_22_33_44
      a = 0xf & (color >>> 12);
      b = 0xf & (color >>> 8);
      c = 0xf & (color >>> 4);
      d = 0xf & color;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      d += d << 4;
      return composeColorInt32(a, b, c, d);

    case 6:
      // 0x12_34_56 ⮕ 0x12_34_56_ff
      return (((0xff_ff_ff & color) << 8) >>> 0) + 0xff;

    case 8:
      // 0x12_34_56_78
      return (0xff_ff_ff_ff & color) >>> 0;
  }

  return 0;
}

/**
 * Composes a 32-bit color integer from 8-bit components.
 */
export function composeColorInt32(a: number, b: number, c: number, d: number): number {
  return ((a << 24) >>> 0) + (((0xff & b) << 16) >>> 0) + (((0xff & c) << 8) >>> 0) + ((0xff & d) >>> 0);
}

/**
 * Returns an 8-bit component from a 32-bit color integer.
 *
 * ```ts
 * getColorIntComponent(0x12_34_56_78, 2);
 * // ⮕ 0x56
 * ```
 */
export function getColorInt32Component(color: number, offset: number): number {
  return 0xff & (color >>> (24 - offset * 8));
}

/**
 * Sets an 8-bit component to a 32-bit color integer.
 *
 * ```ts
 * setColorIntComponent(0x12_34_56_78, 2, 0xab);
 * // ⮕ 0x12_34_ab_78
 * ```
 */
export function setColorInt32Component(color: number, offset: number, value: number): number {
  const shift = 24 - (offset << 3);

  return (((0xff & value) << shift) | (((0xff << shift) ^ 0xff_ff_ff_ff) & color)) >>> 0;
}

/**
 * Converts a normalized 32-bit color integer to components array where each component is normalized to the [0, 1]
 * range.
 */
export function convertColorInt32ToComponents(color: number, components: number[] = [0, 0, 0, 0]): number[] {
  components[0] = getColorInt32Component(color, 0) / 0xff;
  components[1] = getColorInt32Component(color, 1) / 0xff;
  components[2] = getColorInt32Component(color, 2) / 0xff;
  components[3] = getColorInt32Component(color, 3) / 0xff;
  return components;
}

/**
 * Converts components from the [0, 1] range to a 32-bit color integer.
 */
export function convertComponentsToColorInt32(components: readonly number[]): number {
  return composeColorInt32(
    round(components[0] * 0xff),
    round(components[1] * 0xff),
    round(components[2] * 0xff),
    round(components[3] * 0xff)
  );
}

/**
 * Returns a linear interpolator for given pivot points.
 */
export function lerp(xs: ArrayLike<number>, ys: ArrayLike<number>): Interpolator {
  const n = min(xs.length, ys.length);
  const x0 = xs[0];
  const y0 = ys[0];
  const xn = xs[n - 1];
  const yn = ys[n - 1];

  return x => {
    if (x <= x0) {
      return y0;
    }
    if (x >= xn) {
      return yn;
    }

    let i = binarySearch(xs, x, n);
    if (i >= 0) {
      return ys[i];
    }
    i = ~i;

    const xj = xs[i - 1];
    const yj = ys[i - 1];

    return yj + ((x - xj) / (xs[i] - xj)) * (ys[i] - yj);
  };
}

/**
 * Searches the specified array `xs` for the specified value `x` using the binary search algorithm.
 *
 * The array must be sorted into ascending order according to the natural ordering of its elements prior to making
 * this call. If it is not sorted, the results are undefined.
 *
 * @param xs The array to be searched.
 * @param x The value to be searched for.
 * @param n The maximum index in `xs` that is searched (exclusive).
 * @returns The index of the searched value, if it is contained in the array; otherwise, -(insertion point) - 1. The
 * insertion point is defined as the point at which the searched value would be inserted into the array: the index of
 * the first element greater than the searched value, or array length if all elements in the array are less than the
 * specified key. Note that this guarantees that the return value will be ≥ 0 if and only if the searched value is
 * found.
 */
export function binarySearch(xs: ArrayLike<number>, x: number, n: number): number {
  let m = 0;

  --n;

  while (m <= n) {
    const i = (n + m) >> 1;
    const xi = xs[i];

    if (xi < x) {
      m = i + 1;
    } else if (xi > x) {
      n = i - 1;
    } else {
      return i;
    }
  }

  return -m - 1;
}
