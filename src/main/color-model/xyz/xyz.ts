import { ColorModel } from '../../core';
import { convertRGBToXYZ, convertXYZToRGB } from './xyz-rgb';

/**
 * CIE 1931 XYZa color components.
 */
export type XYZ = [x: number, y: number, z: number, alpha: number];

/**
 * CIE 1931 XYZa color model definition.
 */
export const XYZ: ColorModel = {
  name: 'XYZ',
  componentCount: 4,
  convertComponentsToRGB: convertXYZToRGB,
  convertRGBToComponents: convertRGBToXYZ,
};
