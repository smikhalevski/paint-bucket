import {abs} from './math';
import {and, Byte, clampByte, Int64, left, or, right, xor} from './int64';
import {ColorSpace, RawColor} from './colors';

export type NibbleCount = 1 | 2 | 3 | 4 | 6 | 8;

export type ByteOffset = 0 | 1 | 2 | 3;

/**
 * Creates a {@link RawColor} from a plain naked color by adding color space info and nibble normalization.
 *
 * ```ts
 * fromNakedColor(ColorSpace.RGB, 0x1, 1) // → 0x11_11_11_FF_0
 * fromNakedColor(ColorSpace.RGB, 0x12, 2) // → 0x12_12_12_FF_0
 * fromNakedColor(ColorSpace.RGB, 0x123, 3) // → 0x11_22_33_FF_0
 * fromNakedColor(ColorSpace.RGB, 0x1234, 4) // → 0x11_22_33_44_0
 * fromNakedColor(ColorSpace.RGB, 0x12345, 5) // → 0
 * fromNakedColor(ColorSpace.RGB, 0x123456, 6) // → 0x12_34_56_FF_0
 * fromNakedColor(ColorSpace.RGB, 0x1234567, 7) // → 0
 * fromNakedColor(ColorSpace.RGB, 0x12345678, 8) // → 0x12_34_56_78_0
 * ```
 *
 * @param colorSpace The color space assigned to the output color.
 * @param nakedColor The input color to normalize, ex. `0xFF_FF_FF` for white in RGB space.
 * @param nibbleCount The number of nibbles the input color.
 * @return A valid raw color.
 */
export function fromNakedColor(colorSpace: ColorSpace, nakedColor: Int64, nibbleCount: NibbleCount): RawColor {

  nakedColor = abs(nakedColor);

  let a, b, c, d;

  switch (nibbleCount) {

    case 1:
      // 0x1 → 0x11_11_11_FF
      a = 0xF & nakedColor;
      a += a << 4;
      return unsafeComposeBytes(colorSpace, a, a, a, 0xFF);

    case 2:
      // 0x12 → 0x12_12_12_FF
      a = 0xFF & nakedColor;
      return unsafeComposeBytes(colorSpace, a, a, a, 0xFF);

    case 3:
      // 0x123 → 0x11_22_33_FF
      a = 0xF & right(nakedColor, 8);
      b = 0xF & right(nakedColor, 4);
      c = 0xF & nakedColor;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      return unsafeComposeBytes(colorSpace, a, b, c, 0xFF);

    case 4:
      // 0x1234 → 0x11_22_33_44
      a = 0xF & right(nakedColor, 12);
      b = 0xF & right(nakedColor, 8);
      c = 0xF & right(nakedColor, 4);
      d = 0xF & nakedColor;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      d += d << 4;
      return unsafeComposeBytes(colorSpace, a, b, c, d);

    case 6:
      // 0x12_34_56 → 0x12_34_56_FF
      return left(0xFF_FF_FF & nakedColor, 12) + 0xFF_0 + colorSpace;

    case 8:
      // 0x12_34_56_78
      return left(and(0xFF_FF_FF_FF, nakedColor), 4) + colorSpace;
  }

  throw new Error('Invalid nibble count');
}

export function unsafeComposeBytes(colorSpace: ColorSpace, a: Byte, b: Byte, c: Byte, d: Byte): RawColor {
  return left(a, 28) + left(b, 20) + (c << 12) + (d << 4) + colorSpace;
}

export function composeBytes(colorSpace: ColorSpace, a: Byte, b: Byte, c: Byte, d: Byte): RawColor {
  return unsafeComposeBytes(colorSpace, clampByte(a), clampByte(b), clampByte(c), clampByte(d));
}

export function getColorSpace(rawColor: RawColor): ColorSpace {
  return 0xF & rawColor;
}

export function getColorByte(rawColor: RawColor, offset: ByteOffset): Byte {
  return 0xFF & right(rawColor, 28 - offset * 8);
}

export function setColorByte(rawColor: RawColor, offset: ByteOffset, byte: Byte): RawColor {
  const shift = 28 - offset * 8;
  return or(left(clampByte(byte), shift), and(xor(left(0xFF, shift), 0xFF_FF_FF_FF_F), rawColor));
}
