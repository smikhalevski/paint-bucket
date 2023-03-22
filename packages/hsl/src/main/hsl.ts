import { hslToRgb, rgbToHsl } from './hsl-rgb';
import { ColorModel } from '@paint-bucket/core';

/**
 * HSLa color components.
 */
export type Hsl = [H: number, S: number, L: number, a: number];

/**
 * HSLa color model definition.
 */
export const Hsl: ColorModel = {
  componentCount: 4,
  componentsToRgb: hslToRgb,
  rgbToComponents: rgbToHsl,
};
