import {ColorSpace, fromBytes, NakedColor, packByte} from '../bytes';

/**
 * Assembles a color in CIELAB color space.
 *
 * @param L L ∈ [0, 100].
 * @param a a ∈ [-128, 128].
 * @param b b ∈ [-128, 128].
 * @param [alpha = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function lab(L: number, a: number, b: number, alpha = 1): NakedColor {
  return fromBytes(
      ColorSpace.LAB,
      packByte(L, 0, 100),
      packByte(a, -128, 128),
      packByte(b, -128, 128),
      packByte(alpha, 0, 1),
  );
}
