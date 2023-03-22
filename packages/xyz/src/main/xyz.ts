import { ColorModel } from '@paint-bucket/core';
import { rgbToXyz, xyzToRgb } from './xyz-rgb';

/**
 * CIE 1931 XYZa color components.
 */
export type Xyz = [X: number, Y: number, Z: number, a: number];

/**
 * CIE 1931 XYZa color model definition.
 */
export const Xyz: ColorModel = {
  componentCount: 4,
  componentsToRgb: xyzToRgb,
  rgbToComponents: rgbToXyz,
};
