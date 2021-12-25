import {hslToRgb, rgbToHsl} from './hsl-rgb';
import {composeChannels, getColorChannel, IColorSpace, Int64} from '@paint-bucket/core';

/**
 * HSLa color space definition.
 */
export const hslColorSpace: IColorSpace<IHsl> = {
  createColor: createHsl,
  isColor: isHsl,
  colorToRgb: hslToRgb,
  rgbToColor: rgbToHsl,
};

export interface IHsl {

  type: 'hsl',

  /**
   * Hue ∈ [0, 360].
   */
  H: number;

  /**
   * Saturation ∈ [0, 100].
   */
  S: number;

  /**
   * Lightness ∈ [0, 100], 0 = black, 1 = white.
   */
  L: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

export function isHsl(value: any): value is IHsl {
  return typeof value === 'object' && value !== null && value.type === 'hsl';
}

/**
 * Creates black color in HSLa color space.
 */
export function createHsl(): IHsl;

/**
 * Creates a color in HSLa color space.
 *
 * @param H Hue ∈ [0, 360].
 * @param S Saturation ∈ [0, 100].
 * @param L Lightness ∈ [0, 100], 0 = black, 1 = white.
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function createHsl(H: number, S: number, L: number, a?: number): IHsl;

export function createHsl(H = 0, S = 0, L = 0, a = 1): IHsl {
  return {type: 'hsl', H, S, L, a};
}

export function intToHsl(color: Int64, hsl: IHsl): IHsl {
  hsl.H = getColorChannel(color, 0) / 0xFF * 360;
  hsl.S = getColorChannel(color, 1) / 0xFF * 100;
  hsl.L = getColorChannel(color, 2) / 0xFF * 100;
  hsl.a = getColorChannel(color, 3) / 0xFF;
  return hsl;
}

export function hslToInt(hsl: IHsl): Int64 {
  return composeChannels(
      0xFF * hsl.H / 360,
      0xFF * hsl.S / 100,
      0xFF * hsl.L / 100,
      0xFF * hsl.a,
  );
}
