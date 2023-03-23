import { ColorModel } from '@paint-bucket/core';
import { convertHSLToRGB, convertRGBToHSL } from './hsl-rgb';

/**
 * HSLa color components.
 */
export type HSL = [H: number, S: number, L: number, a: number];

/**
 * HSLa color model definition.
 */
export const HSL: ColorModel = {
  componentCount: 4,
  convertComponentsToRGB: convertHSLToRGB,
  convertRGBToComponents: convertRGBToHSL,
};
