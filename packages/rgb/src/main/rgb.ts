import {IColor} from '@paint-bucket/core/lib/Color';
import {IColorModel} from '@paint-bucket/core/lib/color-types';



export interface IRgbColor extends IRgb, IColor {
}

/**
 * RGBa color space definition.
 */
export const RGB: IColorModel<IRgbColor> = {
  createColor: createRgb,
  componentsToRgb: copyRgb,
  rgbToComponents: copyRgb,
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
  return {R, G, B, a};
}

/**
 * Assign channels from `rgb1` to `rgb2`.
 *
 * @returns `rgb2`
 */
export function copyRgb(rgb1: IRgb, rgb2: IRgb): IRgb {
  rgb2.R = rgb1.R;
  rgb2.G = rgb1.G;
  rgb2.B = rgb1.B;
  rgb2.a = rgb1.a;
  return rgb2;
}
