import { ColorModel } from '../../core.js';
import { convertCMYKToRGB, convertRGBToCMYK } from './cmyk-rgb.js';

/**
 * CMYKa color components.
 */
export type CMYK = [cyan: number, magenta: number, yellow: number, black: number, alpha: number];

/**
 * CMYKa color model definition.
 */
export const CMYK: ColorModel = {
  name: 'CMYK',
  componentCount: 5,
  convertComponentsToRGB: convertCMYKToRGB,
  convertRGBToComponents: convertRGBToCMYK,
};
