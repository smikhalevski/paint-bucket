import {composeChannels, getColorChannel} from './channel-utils';
import {IColorSpace} from './core-types';

/**
 * RGBa color space definition.
 */
export const RGB: IColorSpace<IRgb> = {
  createColor: createRgb,
  isColor: isRgb,
  colorToRgb: copyRgb,
  rgbToColor: copyRgb,
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
  return value?.type === 'rgb';
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

/**
 * Assign channels from `rgb1` to `rgb2`.
 */
export function copyRgb(rgb1: IRgb, rgb2: IRgb): IRgb {
  rgb2.R = rgb1.R;
  rgb2.G = rgb1.G;
  rgb2.B = rgb1.B;
  rgb2.a = rgb1.a;
  return rgb2;
}
