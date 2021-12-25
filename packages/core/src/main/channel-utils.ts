import {abs} from './math';
import {and, clampByte, left, or, right, xor} from './int64';
import {Byte, Int64} from './core-types';

export type ByteOffset = 0 | 1 | 2 | 3;

/**
 * Normalizes the size of channel in the given color.
 *
 * ```ts
 * normalizeChannels(0x1, 1) // → 0x11_11_11_FF
 * normalizeChannels(0x12, 2) // → 0x12_12_12_FF
 * normalizeChannels(0x123, 3) // → 0x11_22_33_FF
 * normalizeChannels(0x1234, 4) // → 0x11_22_33_44
 * normalizeChannels(0x12345, 5) // → Error
 * normalizeChannels(0x123456, 6) // → 0x12_34_56_FF
 * normalizeChannels(0x1234567, 7) // → Error
 * normalizeChannels(0x12345678, 8) // → 0x12_34_56_78
 * ```
 *
 * @param color The input color to normalize, ex. `0xFF_FF_FF` for white in RGB space.
 * @param nibbleCount The number (1, 2, 3, 4, 6 or 8) of nibbles the input color.
 * @return A valid raw color.
 */
export function normalizeChannels(color: Int64, nibbleCount: number): Int64 {

  color = abs(color);

  let a, b, c, d;

  switch (nibbleCount) {

    case 1:
      // 0x1 → 0x11_11_11_FF
      a = 0xF & color;
      a += a << 4;
      return unsafeComposeChannels(a, a, a, 0xFF);

    case 2:
      // 0x12 → 0x12_12_12_FF
      a = 0xFF & color;
      return unsafeComposeChannels(a, a, a, 0xFF);

    case 3:
      // 0x123 → 0x11_22_33_FF
      a = 0xF & right(color, 8);
      b = 0xF & right(color, 4);
      c = 0xF & color;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      return unsafeComposeChannels(a, b, c, 0xFF);

    case 4:
      // 0x1234 → 0x11_22_33_44
      a = 0xF & right(color, 12);
      b = 0xF & right(color, 8);
      c = 0xF & right(color, 4);
      d = 0xF & color;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      d += d << 4;
      return unsafeComposeChannels(a, b, c, d);

    case 6:
      // 0x12_34_56 → 0x12_34_56_FF
      return left(0xFF_FF_FF & color, 8) + 0xFF;

    case 8:
      // 0x12_34_56_78
      return and(0xFF_FF_FF_FF, color);
  }

  throw new Error('Invalid nibble count: ' + nibbleCount);
}

export function unsafeComposeChannels(a: Byte, b: Byte, c: Byte, d: Byte): Int64 {
  return left(a, 24) + left(b, 16) + (c << 8) + d;
}

export function composeChannels(a: Byte, b: Byte, c: Byte, d: Byte): Int64 {
  return unsafeComposeChannels(clampByte(a), clampByte(b), clampByte(c), clampByte(d));
}

export function getColorChannel(color: Int64, offset: ByteOffset): Byte {
  return 0xFF & right(color, 24 - offset * 8);
}

export function setColorChannel(color: Int64, offset: ByteOffset, value: Byte): Int64 {
  const shift = 24 - offset * 8;
  return or(left(clampByte(value), shift), and(xor(left(0xFF, shift), 0xFF_FF_FF_FF), color));
}
