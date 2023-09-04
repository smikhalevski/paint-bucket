import { ColorModel } from '../../core';
import { convertHSLToRGB, convertRGBToHSL } from './hsl-rgb';

/**
 * HSLa color components.
 */
export type HSL = [hue: number, saturation: number, lightness: number, alpha: number];

/**
 * HSLa color model definition.
 */
export const HSL: ColorModel = {
  name: 'HSL',
  componentCount: 4,
  convertComponentsToRGB: convertHSLToRGB,
  convertRGBToComponents: convertRGBToHSL,
};
