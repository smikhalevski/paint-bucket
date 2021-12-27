import {hsvToRgb, rgbToHsv} from './hsv-rgb';
import {IColorModel} from '@paint-bucket/core';

/**
 * HSVa color model definition.
 */
export const HSV: IColorModel<IHsv> = {
  createComponents: createHsv,
  cloneComponents: (hsv) => copyHsv(hsv, createHsv()),
  componentsToRgb: hsvToRgb,
  rgbToComponents: rgbToHsv,
};

export interface IHsv {

  /**
   * Hue ∈ [0, 1].
   */
  H: number;

  /**
   * Saturation ∈ [0, 1].
   */
  S: number;

  /**
   * Value ∈ [0, 1].
   */
  V: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

/**
 * Creates black color in HSVa color model.
 */
export function createHsv(): IHsv;

/**
 * Creates a color in HSVa color model.
 *
 * @param H Hue ∈ [0, 1].
 * @param S Saturation ∈ [0, 1].
 * @param V Value ∈ [0, 1].
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function createHsv(H: number, S: number, V: number, a?: number): IHsv;

export function createHsv(H = 0, S = 0, V = 0, a = 1): IHsv {
  return {H, S, V, a};
}

export function copyHsv(hsv1: IHsv, hsv2: IHsv): IHsv {
  hsv2.H = hsv1.H;
  hsv2.S = hsv1.S;
  hsv2.V = hsv1.V;
  hsv2.a = hsv1.a;
  return hsv2;
}
