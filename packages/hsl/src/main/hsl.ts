import {hslToRgb, rgbToHsl} from './hsl-rgb';
import {IColorModel} from '@paint-bucket/core';

/**
 * HSLa color model definition.
 */
export const HSL: IColorModel<IHsl> = {
  createComponents: createHsl,
  cloneComponents: (hsl) => copyHsl(hsl, createHsl()),
  componentsToRgb: hslToRgb,
  rgbToComponents: rgbToHsl,
};

export interface IHsl {

  /**
   * Hue ∈ [0, 1].
   */
  H: number;

  /**
   * Saturation ∈ [0, 1].
   */
  S: number;

  /**
   * Lightness ∈ [0, 1], 0 = black, 1 = white.
   */
  L: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

/**
 * Creates black color in HSLa color model.
 */
export function createHsl(): IHsl;

/**
 * Creates a color in HSLa color model.
 *
 * @param H Hue ∈ [0, 1].
 * @param S Saturation ∈ [0, 1].
 * @param L Lightness ∈ [0, 1], 0 = black, 1 = white.
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function createHsl(H: number, S: number, L: number, a?: number): IHsl;

export function createHsl(H = 0, S = 0, L = 0, a = 1): IHsl {
  return {H, S, L, a};
}

export function copyHsl(hsl1: IHsl, hsl2: IHsl): IHsl {
  hsl2.H = hsl1.H;
  hsl2.S = hsl1.S;
  hsl2.L = hsl1.L;
  hsl2.a = hsl1.a;
  return hsl2;
}
