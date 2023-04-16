import type { ColorModel } from './types';

/**
 * Color components of the RGBa color model.
 */
export type RGB = [R: number, G: number, B: number, a: number];

/**
 * RGBa color model definition.
 */
export const RGB: ColorModel = {
  name: 'RGB',
  componentCount: 4,
  convertComponentsToRGB: copyComponents,
  convertRGBToComponents: copyComponents,
};

function copyComponents(source: readonly number[], target: number[]): void {
  target[0] = source[0];
  target[1] = source[1];
  target[2] = source[2];
  target[3] = source[3];
}
