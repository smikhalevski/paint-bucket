import { convertHSVToRGB, convertRGBToHSV } from './hsv-rgb';
import { ColorModel } from '@paint-bucket/core';

/**
 * HSVa color components.
 */
export type HSV = [H: number, S: number, V: number, a: number];

/**
 * HSVa color model definition.
 */
export const HSV: ColorModel = {
  componentCount: 4,
  convertComponentsToRGB: convertHSVToRGB,
  convertRGBToComponents: convertRGBToHSV,
};
