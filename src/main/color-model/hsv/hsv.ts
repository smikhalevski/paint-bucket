import { ColorModel } from '../../core';
import { convertHSVToRGB, convertRGBToHSV } from './hsv-rgb';

/**
 * HSVa color components.
 */
export type HSV = [hue: number, saturation: number, value: number, alpha: number];

/**
 * HSVa color model definition.
 */
export const HSV: ColorModel = {
  name: 'HSV',
  componentCount: 4,
  convertComponentsToRGB: convertHSVToRGB,
  convertRGBToComponents: convertRGBToHSV,
};
