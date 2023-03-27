import { ColorModel } from '@paint-bucket/core';
import { convertHSVToRGB, convertRGBToHSV } from './hsv-rgb';

/**
 * HSVa color components.
 */
export type HSV = [H: number, S: number, V: number, a: number];

/**
 * HSVa color model definition.
 */
export const HSV: ColorModel = {
  name: 'hsv',
  componentCount: 4,
  convertComponentsToRGB: convertHSVToRGB,
  convertRGBToComponents: convertRGBToHSV,
};
