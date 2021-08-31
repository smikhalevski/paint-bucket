import {abs} from './math';
import {and, Byte, clampByte, Int, left, or, right, xor} from './int';
import {ColorSpace, PackedColor} from './color-types';

export type NibbleCount = 1 | 2 | 3 | 4 | 6 | 8;

export type ByteOffset = 0 | 1 | 2 | 3;

/**
 * Normalizes bytes in the color value.
 *
 * ```ts
 * fromRawColor(ColorSpace.RGB, 0x1, 1) // → 0x11_11_11_FF_0
 * fromRawColor(ColorSpace.RGB, 0x12, 2) // → 0x12_12_12_FF_0
 * fromRawColor(ColorSpace.RGB, 0x123, 3) // → 0x11_22_33_FF_0
 * fromRawColor(ColorSpace.RGB, 0x1234, 4) // → 0x11_22_33_44_0
 * fromRawColor(ColorSpace.RGB, 0x12345, 5) // → 0
 * fromRawColor(ColorSpace.RGB, 0x123456, 6) // → 0x12_34_56_FF_0
 * fromRawColor(ColorSpace.RGB, 0x1234567, 7) // → 0
 * fromRawColor(ColorSpace.RGB, 0x12345678, 8) // → 0x12_34_56_78_0
 * ```
 *
 * @param colorSpace The color space assigned to the output color.
 * @param rawColor The input color to normalize, ex. `0xFF_FF_FF` for white in RGB space.
 * @param nibbleCount The number of nibbles the input color.
 * @return The normalized color.
 */
export function fromRawColor(colorSpace: ColorSpace, rawColor: Int, nibbleCount: NibbleCount): PackedColor {

  rawColor = abs(rawColor);

  let a, b, c, d;

  switch (nibbleCount) {

    case 1:
      // 0x1 → 0x11_11_11_FF
      a = 0xF & rawColor;
      a += a << 4;
      return fromRawBytes(colorSpace, a, a, a, 0xFF);

    case 2:
      // 0x12 → 0x12_12_12_FF
      a = 0xFF & rawColor;
      return fromRawBytes(colorSpace, a, a, a, 0xFF);

    case 3:
      // 0x123 → 0x11_22_33_FF
      a = 0xF & right(rawColor, 8);
      b = 0xF & right(rawColor, 4);
      c = 0xF & rawColor;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      return fromRawBytes(colorSpace, a, b, c, 0xFF);

    case 4:
      // 0x1234 → 0x11_22_33_44
      a = 0xF & right(rawColor, 12);
      b = 0xF & right(rawColor, 8);
      c = 0xF & right(rawColor, 4);
      d = 0xF & rawColor;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      d += d << 4;
      return fromRawBytes(colorSpace, a, b, c, d);

    case 6:
      // 0x12_34_56 → 0x12_34_56_FF
      return left(0xFF_FF_FF & rawColor, 12) + 0xFF_0 + colorSpace;

    case 8:
      // 0x12_34_56_78
      return left(and(0xFF_FF_FF_FF, rawColor), 4) + colorSpace;
  }

  return colorSpace;
}

export function fromRawBytes(colorSpace: ColorSpace, a: Byte, b: Byte, c: Byte, d: Byte): PackedColor {
  return left(a, 28) + left(b, 20) + (c << 12) + (d << 4) + colorSpace;
}

export function fromBytes(colorSpace: ColorSpace, a: Byte, b: Byte, c: Byte, d: Byte): PackedColor {
  return fromRawBytes(colorSpace, clampByte(a), clampByte(b), clampByte(c), clampByte(d));
}

export function getColorSpace(color: PackedColor): ColorSpace {
  return 0xF & color;
}

export function getColorByte(color: PackedColor, offset: ByteOffset): Byte {
  return 0xFF & right(color, 28 - offset * 8);
}

export function setColorByte(color: PackedColor, offset: ByteOffset, byte: Byte): PackedColor {
  const shift = 28 - offset * 8;
  return or(left(clampByte(byte), shift), and(xor(left(0xFF, shift), 0xFF_FF_FF_FF_F), color));
}

export function getColorFloat(color: PackedColor, offset: ByteOffset): number {
  return getColorByte(color, offset) / 0xFF;
}

export function isColorSpace(color: PackedColor, colorSpace: ColorSpace): boolean {
  return getColorSpace(color) === colorSpace;
}

/**
 * Maps n ∈ [a, b] to [0, 0xFF].
 */
export function toByte(n: number, a: number, b: number): Byte {
  return 0xFF * (n - a) / (b - a);
}

/**
 * Maps byte ∈ [0, 0xFF] to [a, b].
 */
export function fromByte(byte: Byte, a: number, b: number): number {
  return a + (b - a) * byte / 0xFF;
}
