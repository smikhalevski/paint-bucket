import {hslToRgb, rgbToHsl} from './hsl-rgb';
import {ColorModel} from '@paint-bucket/core';

export type Hsl = [H: number, S: number, L: number, a: number];

/**
 * HSLa color model definition.
 */
export const Hsl: ColorModel = {
  componentsToRgb: hslToRgb,
  rgbToComponents: rgbToHsl,
};
