import {IColorModel, IRgb} from '@paint-bucket/core';

/**
 * RGBa color model definition.
 */
export const RGB: IColorModel<IRgb> = {
  createComponents: createRgb,
  cloneComponents: (rgb) => copyRgb(rgb, createRgb()),
  componentsToRgb: copyRgb,
  rgbToComponents: copyRgb,
};

/**
 * Creates black color in RGBa color model.
 */
export function createRgb(): IRgb;

/**
 * Creates a color in RGBa color model.
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

export function copyRgb(rgb1: IRgb, rgb2: IRgb): IRgb {
  rgb2.R = rgb1.R;
  rgb2.G = rgb1.G;
  rgb2.B = rgb1.B;
  rgb2.a = rgb1.a;
  return rgb2;
}
