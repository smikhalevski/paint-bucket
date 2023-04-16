import { ColorModel } from '../../core';
import { convertRGBToXYZ, convertXYZToRGB } from './xyz-rgb';

/**
 * CIE 1931 XYZa color components.
 */
export type XYZ = [X: number, Y: number, Z: number, a: number];

/**
 * CIE 1931 XYZa color model definition.
 */
export const XYZ: ColorModel = {
  name: 'XYZ',
  componentCount: 4,
  convertComponentsToRGB: convertXYZToRGB,
  convertRGBToComponents: convertRGBToXYZ,
};
