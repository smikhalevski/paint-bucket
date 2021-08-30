import {ColorSpace, fromBytes, NakedColor, packByte} from '../bytes';

/**
 * Assembles a color in XYZ color space.
 *
 * @param x X ∈ [0, 1].
 * @param y Y ∈ [0, 1].
 * @param z Z ∈ [0, 1].
 * @param [alpha = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function xyz(x: number, y: number, z: number, alpha = 1): NakedColor {
  return fromBytes(
      ColorSpace.XYZ,
      packByte(x, 0, 0.95048),
      packByte(y, 0, 1),
      packByte(z, 0, 1.08882),
      packByte(alpha, 0, 1),
  );
}
