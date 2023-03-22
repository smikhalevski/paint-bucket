import { hsvToRgb, rgbToHsv } from './hsv-rgb';
import { ColorModel } from '@paint-bucket/core';

/**
 * HSVa color components.
 */
export type Hsv = [H: number, S: number, V: number, a: number];

/**
 * HSVa color model definition.
 */
export const Hsv: ColorModel = {
  componentCount: 4,
  componentsToRgb: hsvToRgb,
  rgbToComponents: rgbToHsv,
};
