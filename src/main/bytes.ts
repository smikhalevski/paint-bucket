import {abs} from './math';
import {and, Byte, clampByte, Int, left, or, right, xor} from './int';

export type NibbleCount = 1 | 2 | 3 | 4 | 6 | 8;

export type ByteOffset = 0 | 1 | 2 | 3;

export type NakedColor = Int;

export const enum ColorModel {
  RGB = 0,
  HSL = 1,
}

/**
 * Normalizes bytes in the color value.
 *
 * ```ts
 * fromRawColor(ColorModel.HSL, 0x1, 1) // → 0x11_11_11_FF_01
 * fromRawColor(ColorModel.HSL, 0x12, 2) // → 0x12_12_12_FF_01
 * fromRawColor(ColorModel.HSL, 0x123, 3) // → 0x11_22_33_FF_01
 * fromRawColor(ColorModel.HSL, 0x1234, 4) // → 0x11_22_33_44_01
 * fromRawColor(ColorModel.HSL, 0x12345, 5) // → 0
 * fromRawColor(ColorModel.HSL, 0x123456, 6) // → 0x12_34_56_FF_01
 * fromRawColor(ColorModel.HSL, 0x1234567, 7) // → 0
 * fromRawColor(ColorModel.HSL, 0x12345678, 8) // → 0x12_34_56_78_01
 * ```
 *
 * @param colorModel The color model assigned to the output color.
 * @param rawColor The input color to normalize, ex. `0xFF_FF_FF` for white in RGB space.
 * @param nibbleCount The number of nibbles the input color.
 * @return The normalized color or -1 if `nibbleCount` is invalid.
 */
export function fromRawColor(colorModel: ColorModel, rawColor: Int, nibbleCount: NibbleCount): NakedColor | -1 {

  rawColor = abs(rawColor);

  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;

  switch (nibbleCount) {

    case 1:
      // 0x1 → 0x11_11_11_FF
      a = 0x0F & rawColor;
      a += a << 4;
      return fromRawBytes(colorModel, a, a, a, 0xFF);

    case 2:
      // 0x12 → 0x12_12_12_FF
      a = 0xFF & rawColor;
      return fromRawBytes(colorModel, a, a, a, 0xFF);

    case 3:
      // 0x123 → 0x11_22_33_FF
      a = 0x0F & right(rawColor, 8);
      b = 0x0F & right(rawColor, 4);
      c = 0x0F & rawColor;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      return fromRawBytes(colorModel, a, b, c, 0xFF);

    case 4:
      // 0x1234 → 0x11_22_33_44
      a = 0x0F & right(rawColor, 12);
      b = 0x0F & right(rawColor, 8);
      c = 0x0F & right(rawColor, 4);
      d = 0x0F & rawColor;
      a += a << 4;
      b += b << 4;
      c += c << 4;
      d += d << 4;
      return fromRawBytes(colorModel, a, b, c, d);

    case 6:
      // 0x12_34_56 → 0x12_34_56_FF
      return left(0xFF_FF_FF & rawColor, 16) + 0xFF00 + colorModel;

    case 8:
      // 0x12_34_56_78
      return left(and(0xFF_FF_FF_FF, rawColor), 8) + colorModel;
  }

  return -1;
}

export function fromRawBytes(colorModel: ColorModel, a: Byte, b: Byte, c: Byte, d: Byte): NakedColor {
  return left(a, 32) + left(b, 24) + (c << 16) + (d << 8) + colorModel;
}

export function fromBytes(colorModel: ColorModel, a: Byte, b: Byte, c: Byte, d: Byte): NakedColor {
  return fromRawBytes(colorModel, clampByte(a), clampByte(b), clampByte(c), clampByte(d));
}

export function getColorModel(color: NakedColor): ColorModel {
  return 0xFF & color;
}

export function getColorByte(color: NakedColor, offset: ByteOffset): Byte {
  return 0xFF & right(color, 32 - offset * 8);
}

export function setColorByte(color: NakedColor, offset: ByteOffset, byte: Byte): NakedColor {
  const shift = 32 - offset * 8;
  return or(left(clampByte(byte), shift), and(xor(left(0xFF, shift), 0xFF_FF_FF_FF_FF), color));
}

export function getColorFloat(color: NakedColor, offset: ByteOffset): number {
  return getColorByte(color, offset) / 0xFF;
}
