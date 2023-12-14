import type { ColorModel } from '../../core';
import { convertLABhToRGB, convertRGBToLABh } from './labh-rgb';

/**
 * Hunter L, a, b color components.
 */
export type LABh = [L: number, a: number, b: number, alpha: number];

/**
 * Hunter L, a, b color model definition.
 */
export const LABh: ColorModel = {
  name: 'LABh',
  componentCount: 4,
  convertComponentsToRGB: convertLABhToRGB,
  convertRGBToComponents: convertRGBToLABh,
};
