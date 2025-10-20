import { ColorModel } from '../../core.js';
import { convertHWBToRGB, convertRGBToHWB } from './hwb-rgb.js';

/**
 * HWBa color components.
 */
export type HWB = [hue: number, whiteness: number, blackness: number, alpha: number];

/**
 * HWBa color model definition.
 */
export const HWB: ColorModel = {
  name: 'HWB',
  componentCount: 4,
  convertComponentsToRGB: convertHWBToRGB,
  convertRGBToComponents: convertRGBToHWB,
};
