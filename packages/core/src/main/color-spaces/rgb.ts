import {composeChannels, getColorChannel} from '../channel-utils';
import {FF} from '../int64';
import {Int64} from '../data-types';
import {IColorSpace} from './color-space-types';
import {rgbToRgb} from './rgb-rgb';

/**
 * RGBa color space definition.
 */
export const rgbColorSpace: IColorSpace<IRgb> = {
  createColor: createRgb,
  isColor: isRgb,
  colorToRgb: rgbToRgb,
  rgbToColor: rgbToRgb,
};

export interface IRgb {

  readonly type: 'rgb';

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

export function isRgb(value: any): value is IRgb {
  return typeof value === 'object' && value !== null && value.type === 'rgb';
}

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
