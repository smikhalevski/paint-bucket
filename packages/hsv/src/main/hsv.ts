import {hsvToRgb, rgbToHsv} from './hsv-rgb';
import {ColorModel} from '@paint-bucket/core';

export type Hsv = [H: number, S: number, V: number, a: number];

/**
 * HSVa color model definition.
 */
export const Hsv: ColorModel = {
  componentsToRgb: hsvToRgb,
  rgbToComponents: rgbToHsv,
};
