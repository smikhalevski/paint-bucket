import {ColorSpace, fromBytes, NakedColor, packByte} from '../bytes';

export const blackHsl = hsl(0, 0, 0);
export const whiteHsl = hsl(0, 0, 1);

/**
 * Assembles a color in HSL color space.
 *
 * @param h Hue ∈ [0, 360].
 * @param s Saturation ∈ [0, 100].
 * @param l Lightness ∈ [0, 100], 0 = black, 1 = white.
 * @param [alpha = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function hsl(h: number, s: number, l: number, alpha = 1): NakedColor {
  return fromBytes(
      ColorSpace.HSL,
      packByte(h, 0, 360),
      packByte(s, 0, 100),
      packByte(l, 0, 100),
      packByte(alpha, 0, 1),
  );
}
