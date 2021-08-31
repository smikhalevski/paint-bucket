import {fromBytes, getColorByte} from '../packed-color';
import {ColorSpace, IHslColor, PackedColor} from '../color-types';
import {FF} from '../int';

/**
 * Assembles a color in HSLa color space.
 *
 * @param H Hue ∈ [0, 360].
 * @param S Saturation ∈ [0, 100].
 * @param L Lightness ∈ [0, 100], 0 = black, 1 = white.
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function hsl(H: number, S: number, L: number, a = 1): IHslColor {
  return {colorSpace: ColorSpace.HSL, H, S, L, a};
}

export function packHsl(hsl: IHslColor): PackedColor {
  return fromBytes(
      ColorSpace.HSL,
      FF * hsl.H / 360,
      FF * hsl.S / 100,
      FF * hsl.L / 100,
      FF * hsl.a,
  );
}

export function unpackHsl(packedHsl: PackedColor, hsl: IHslColor): IHslColor {
  hsl.H = getColorByte(packedHsl, 0) / FF * 360;
  hsl.S = getColorByte(packedHsl, 1) / FF * 100;
  hsl.L = getColorByte(packedHsl, 2) / FF * 100;
  hsl.a = getColorByte(packedHsl, 3) / FF;

  return hsl;
}
