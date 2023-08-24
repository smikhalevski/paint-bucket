import { ColorModel } from '../../core';
import { convertHSVToRGB, convertRGBToHSV } from './hsv-rgb';

/**
 * HSVa color components.
 */
export type HSV = [H: number, S: number, V: number, a: number];

/**
 * HSVa color model definition.
 */
export const HSV: ColorModel = {
  name: 'HSV',
  componentCount: 4,
  convertComponentsToRGB: convertHSVToRGB,
  convertRGBToComponents: convertRGBToHSV,
};
