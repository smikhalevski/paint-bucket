import { and, byte, left, or, right, xor } from 'algomatic';

const { round } = Math;

/**
 * Clamps component to [0, 1] range.
 *
 * @param x The value to clamp.
 */
export function clamp(x: number): number {
  x = +x;
  return x <= 1 ? (x >= 0 ? x : 0) : 1;
}

/**
 * Normalizes the size of components in the binary representation of the 24-bit color.
 *
 * ```ts
 * normalizeComponents(0x1, 1) // ⮕ 0x11_11_11_ff
 * normalizeComponents(0x12, 2) // ⮕ 0x12_12_12_ff
 * normalizeComponents(0x123, 3) // ⮕ 0x11_22_33_ff
 * normalizeComponents(0x1234, 4) // ⮕ 0x11_22_33_44
 * normalizeComponents(0x12345, 5) // ⮕ 0
 * normalizeComponents(0x123456, 6) // ⮕ 0x12_34_56_ff
 * normalizeComponents(0x1234567, 7) // ⮕ 0
 * normalizeComponents(0x12345678, 8) // ⮕ 0x12_34_56_78
 * ```
 *
 * @param components The input color to normalize, ex. `0xff_ff_ff` for white in RGB space.
 * @param nibbleCount The number (1, 2, 3, 4, 6 or 8) of nibbles the input color.
 * @return A valid raw color.
 */
export function normalizeComponents(components: number, nibbleCount: number): number {
  components = Math.abs(components);

  let a, b, c, d;

  switch (nibbleCount) {
    case 1:
      // 0x1 ⮕ 0x11_11_11_ff
      a = 0xf & components;
      a += a << 4;
      return unsafeComposeComponents(a, a, a, 0xff);

    case 2:
      // 0x12 ⮕ 0x12_12_12_ff
      a = 0xff & components;
      return unsafeComposeComponents(a, a, a, 0xff);

    case 3:
      // 0x123 ⮕ 0x11_22_33_ff
      a = 0xf & right(components, 8);
      b = 0xf & right(components, 4);
      c = 0xf & components;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      return unsafeComposeComponents(a, b, c, 0xff);

    case 4:
      // 0x1234 ⮕ 0x11_22_33_44
      a = 0xf & right(components, 12);
      b = 0xf & right(components, 8);
      c = 0xf & right(components, 4);
      d = 0xf & components;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      d += d << 4;
      return unsafeComposeComponents(a, b, c, d);

    case 6:
      // 0x12_34_56 ⮕ 0x12_34_56_ff
      return left(0xff_ff_ff & components, 8) + 0xff;

    case 8:
      // 0x12_34_56_78
      return and(0xff_ff_ff_ff, components);
  }

  return 0;
}

export function unsafeComposeComponents(a: number, b: number, c: number, d: number): number {
  return left(a, 24) + left(b, 16) + (c << 8) + d;
}

export function composeComponents(a: number, b: number, c: number, d: number): number {
  return unsafeComposeComponents(byte(a), byte(b), byte(c), byte(d));
}

export function getComponent(components: number, offset: number): number {
  return 0xff & right(components, 24 - offset * 8);
}

export function setComponent(components: number, offset: number, value: number): number {
  const shift = 24 - offset * 8;
  return or(left(byte(value), shift), and(xor(left(0xff, shift), 0xff_ff_ff_ff), components));
}

/**
 * Converts normalized 32-bit integer color representation to components array where each component is normalized to
 * range [0, 1].
 */
export function intToComponents(color: number, components: number[]): number[] {
  components[0] = getComponent(color, 0) / 0xff;
  components[1] = getComponent(color, 1) / 0xff;
  components[2] = getComponent(color, 2) / 0xff;
  components[3] = getComponent(color, 3) / 0xff;
  return components;
}

/**
 * Converts components that are normalized to range [0, 1] to a 32-bit integer color representation.
 */
export function componentsToInt(components: readonly number[]): number {
  return composeComponents(
    round(components[0] * 0xff),
    round(components[1] * 0xff),
    round(components[2] * 0xff),
    round(components[3] * 0xff)
  );
}
