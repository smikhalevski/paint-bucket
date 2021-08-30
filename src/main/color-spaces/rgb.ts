import {Byte} from '../int';
import {ColorSpace, fromBytes, NakedColor, packByte} from '../bytes';

export const blackRgb = rgb(0, 0, 0);
export const whiteRgb = rgb(0xFF, 0xFF, 0xFF);

/**
 * Assembles a color in RGB color space.
 *
 * @param r Red ∈ [0, 255].
 * @param g Green ∈ [0, 255].
 * @param b Blue ∈ [0, 255].
 * @param [alpha = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function rgb(r: Byte, g: Byte, b: Byte, alpha = 1): NakedColor {
  return fromBytes(ColorSpace.RGB, r, g, b, packByte(alpha, 0, 1));
}
