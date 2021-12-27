import {and, byte, left, or, right, xor} from 'numeric-wrench';

/**
 * Normalizes the size of components in the binary representation of the 24-bit color.
 *
 * ```ts
 * normalizeComponents(0x1, 1) // → 0x11_11_11_FF
 * normalizeComponents(0x12, 2) // → 0x12_12_12_FF
 * normalizeComponents(0x123, 3) // → 0x11_22_33_FF
 * normalizeComponents(0x1234, 4) // → 0x11_22_33_44
 * normalizeComponents(0x12345, 5) // → 0
 * normalizeComponents(0x123456, 6) // → 0x12_34_56_FF
 * normalizeComponents(0x1234567, 7) // → 0
 * normalizeComponents(0x12345678, 8) // → 0x12_34_56_78
 * ```
 *
 * @param components The input color to normalize, ex. `0xFF_FF_FF` for white in RGB space.
 * @param nibbleCount The number (1, 2, 3, 4, 6 or 8) of nibbles the input color.
 * @return A valid raw color.
 */
export function normalizeComponents(components: number, nibbleCount: number): number {

  components = Math.abs(components);

  let a, b, c, d;

  switch (nibbleCount) {

    case 1:
      // 0x1 → 0x11_11_11_FF
      a = 0xF & components;
      a += a << 4;
      return unsafeComposeComponents(a, a, a, 0xFF);

    case 2:
      // 0x12 → 0x12_12_12_FF
      a = 0xFF & components;
      return unsafeComposeComponents(a, a, a, 0xFF);

    case 3:
      // 0x123 → 0x11_22_33_FF
      a = 0xF & right(components, 8);
      b = 0xF & right(components, 4);
      c = 0xF & components;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      return unsafeComposeComponents(a, b, c, 0xFF);

    case 4:
      // 0x1234 → 0x11_22_33_44
      a = 0xF & right(components, 12);
      b = 0xF & right(components, 8);
      c = 0xF & right(components, 4);
      d = 0xF & components;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      d += d << 4;
      return unsafeComposeComponents(a, b, c, d);

    case 6:
      // 0x12_34_56 → 0x12_34_56_FF
      return left(0xFF_FF_FF & components, 8) + 0xFF;

    case 8:
      // 0x12_34_56_78
      return and(0xFF_FF_FF_FF, components);
  }

  return 0;
}

export function unsafeComposeComponents(a: number, b: number, c: number, d: number): number {
  return left(a, 24) + left(b, 16) + (c << 8) + d;
}

export function composeComponents(a: number, b: number, c: number, d: number): number {
  return unsafeComposeComponents(byte(a), byte(b), byte(c), byte(d));
}

export function getColorComponent(components: number, offset: number): number {
  return 0xFF & right(components, 24 - offset * 8);
}

export function setColorComponent(components: number, offset: number, value: number): number {
  const shift = 24 - offset * 8;
  return or(left(byte(value), shift), and(xor(left(0xFF, shift), 0xFF_FF_FF_FF), components));
}
