import {fromBytes, getColorByte} from '../packed-color';
import {ColorSpace, IRgbColor, PackedColor} from '../color-types';
import {FF} from '../int';

/**
 * Assembles a color in RGBa color space.
 *
 * @param R Red ∈ [0, 255].
 * @param G Green ∈ [0, 255].
 * @param B Blue ∈ [0, 255].
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function rgb(R: number, G: number, B: number, a = 1): IRgbColor {
  return {colorSpace: ColorSpace.RGB, R, G, B, a};
}

export function packRgb(rgb: IRgbColor): PackedColor {
  return fromBytes(ColorSpace.RGB, rgb.R, rgb.G, rgb.B, FF * rgb.a);
}

export function unpackRgb(packedRgb: PackedColor, rgb: IRgbColor): IRgbColor {
  rgb.R = getColorByte(packedRgb, 0);
  rgb.G = getColorByte(packedRgb, 1);
  rgb.B = getColorByte(packedRgb, 2);
  rgb.a = getColorByte(packedRgb, 3) / FF;

  return rgb;
}
