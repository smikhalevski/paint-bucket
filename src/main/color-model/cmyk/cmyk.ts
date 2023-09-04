import { ColorModel } from '../../core';
import { convertCMYKToRGB, convertRGBToCMYK } from './cmyk-rgb';

/**
 * CMYKa color components.
 */
export type CMYK = [C: number, M: number, Y: number, K: number, a: number];

/**
 * CMYKa color model definition.
 */
export const CMYK: ColorModel = {
  name: 'CMYK',
  componentCount: 5,
  convertComponentsToRGB: convertCMYKToRGB,
  convertRGBToComponents: convertRGBToCMYK,
};
