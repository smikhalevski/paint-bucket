import {abs, Int32, min, Octet, Uint32, Uint64} from './int';

export type NibbleCount = 1 | 2 | 3 | 4 | 6 | 8;

export const enum ColorModel {
  RGB,
  HSL,
  LAB,
  XYZ,
  CMYK,
}

/**
 * Normalizes octets in the color value.
 *
 * ```ts
 * normalizeColor(0x1, 1) // → 0x111111FF
 * normalizeColor(0x12, 2) // → 0x121212FF
 * normalizeColor(0x123, 3) // → 0x112233FF
 * normalizeColor(0x1234, 4) // → 0x11223344
 * normalizeColor(0x12345, 5) // → 0
 * normalizeColor(0x123456, 6) // → 0x123456FF
 * normalizeColor(0x1234567, 7) // → 0
 * normalizeColor(0x12345678, 8) // → 0x12345678
 * ```
 *
 * @param rawColor The input color to normalize.
 * @param nibbleCount The number of nibbles the input color.
 * @return The normalized color or 0 if `nibbleCount` is invalid.
 */
export function normalizeOctets(rawColor: Int32, nibbleCount: NibbleCount): Uint32 {

  rawColor = abs(rawColor);

  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;

  switch (nibbleCount) {

    case 1:
      // 0x1 → 0x111111FF
      a = 0xF & rawColor;
      a += a << 4;
      return (a << 24) + (a << 16) + (a << 8) + 0xFF;

    case 2:
      // 0x12 → 0x121212FF
      a = 0xFF & rawColor;
      return (a << 24) + (a << 16) + (a << 8) + 0xFF;

    case 3:
      // 0x123 → 0x112233FF
      a = 0xF & (rawColor >> 8);
      b = 0xF & (rawColor >> 4);
      c = 0xF & (rawColor >> 0);
      a += a << 4;
      b += b << 4;
      c += c << 4;
      return (a << 24) + (b << 16) + (c << 8) + 0xFF;

    case 4:
      // 0x1234 → 0x11223344
      a = 0xF & (rawColor >> 12);
      b = 0xF & (rawColor >> 8);
      c = 0xF & (rawColor >> 4);
      d = 0xF & (rawColor >> 0);
      a += a << 4;
      b += b << 4;
      c += c << 4;
      d += d << 4;
      return (a << 24) + (b << 16) + (c << 8) + d;

    case 6:
      // 0x123456 → 0x123456FF
      return ((0xFFFFFF & rawColor) << 8) + 0xFF;

    case 8:
      // 0x12345678
      return 0xFFFFFFFF & rawColor;
  }

  return 0;
}

function clampOctet(a: Int32): Octet {
  return min(abs(a), 0xFF);
}

export function makeColor(colorModel: ColorModel, rawColor: Int32, nibbleCount: NibbleCount): Uint64 {
  return normalizeOctets(rawColor, nibbleCount) * 0x100 + (0xFF & colorModel);
}

export function fromOctets(colorModel: ColorModel, a: Octet, b: Octet, c: Octet, d: Octet): Octet {
  return ((clampOctet(a) << 24) + (clampOctet(b) << 16) + (clampOctet(c) << 8) + clampOctet(d)) * 0x100 + +(0xFF & colorModel);
}

export function getColorModel(color: Uint64): ColorModel {
  return 0xFF & color;
}

export function getColorOctet(color: Uint64, index: 0 | 1 | 2 | 3): Uint32 {
  return 0xFF & color / 0x100 >> (3 - index) * 8;
}
