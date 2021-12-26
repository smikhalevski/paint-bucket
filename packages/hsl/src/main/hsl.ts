import {hslToRgb, rgbToHsl} from './hsl-rgb';
import {IColorModel} from '@paint-bucket/core';

/**
 * HSLa color model definition.
 */
export const HSL: IColorModel<IHsl> = {
  createColor: createHsl,
  isColor: isHsl,
  componentsToRgb: hslToRgb,
  rgbToComponents: rgbToHsl,
};

export interface IHsl {

  type: 'hsl',

  /**
   * Hue ∈ [0, 360].
   */
  H: number;

  /**
   * Saturation ∈ [0, 100].
   */
  S: number;

  /**
   * Lightness ∈ [0, 100], 0 = black, 1 = white.
   */
  L: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

export function isHsl(value: any): value is IHsl {
  return value?.type === 'hsl';
}

/**
 * Creates black color in HSLa color model.
 */
export function createHsl(): IHsl;

/**
 * Creates a color in HSLa color model.
 *
 * @param H Hue ∈ [0, 360].
 * @param S Saturation ∈ [0, 100].
 * @param L Lightness ∈ [0, 100], 0 = black, 1 = white.
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function createHsl(H: number, S: number, L: number, a?: number): IHsl;

export function createHsl(H = 0, S = 0, L = 0, a = 1): IHsl {
  return {type: 'hsl', H, S, L, a};
}
