import { ColorModel } from '../../core';
import { convertLABToRGB, convertRGBToLAB } from './lab-rgb';

/**
 * CIE-L*a*b* color components.
 */
export type LAB = [L: number, A: number, B: number, a: number];

/**
 * CIE-L*a*b* color model definition.
 */
export const LAB: ColorModel = {
  name: 'LAB',
  componentCount: 4,
  convertComponentsToRGB: convertLABToRGB,
  convertRGBToComponents: convertRGBToLAB,
};
