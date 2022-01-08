import {ColorModel} from '@paint-bucket/core';
import {labToRgb, rgbToLab} from './lab-rgb';

export type Lab = [L: number, A: number, B: number, a: number];

/**
 * CIE-L*a*b* color model definition.
 */
export const Lab: ColorModel = {
  componentsToRgb: labToRgb,
  rgbToComponents: rgbToLab,
};
