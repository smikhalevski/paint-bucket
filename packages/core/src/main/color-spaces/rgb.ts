import {composeChannels, getColorChannel} from '../channel-utils';
import {FF} from '../int64';
import {Int64} from '../data-types';
import {IColor, IColorSpace} from './color-space-types';
import {rgbToRgb} from './rgb-rgb';

export interface IRgb extends IColor<'rgb'> {

  /**
   * Red ∈ [0, 255].
   */
  R: number;

  /**
   * Green ∈ [0, 255].
   */
  G: number;

  /**
   * Blue ∈ [0, 255].
   */
  B: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

/**
 * RGBa color space definition.
 */
export const rgb: IColorSpace<IRgb, 'rgb'> = {
  type: 'rgb',
  create: createRgb,
  colorToRgb: rgbToRgb,
  rgbToColor: rgbToRgb,
};

/**
 * Creates black color in RGBa color space.
 */
export function createRgb(): IRgb;

/**
 * Creates a color in RGBa color space.
 *
 * @param R Red ∈ [0, 255].
 * @param G Green ∈ [0, 255].
 * @param B Blue ∈ [0, 255].
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function createRgb(R: number, G: number, B: number, a?: number): IRgb;

export function createRgb(R = 0, G = 0, B = 0, a = 1): IRgb {
  return {type: 'rgb', R, G, B, a};
}

export function intToRgb(color: Int64, rgb: IRgb): IRgb {
  rgb.R = getColorChannel(color, 0);
  rgb.G = getColorChannel(color, 1);
  rgb.B = getColorChannel(color, 2);
  rgb.a = getColorChannel(color, 3) / FF;
  return rgb;
}

export function rgbToInt(rgb: IRgb): Int64 {
  return composeChannels(rgb.R, rgb.G, rgb.B, FF * rgb.a);
}
