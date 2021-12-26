import {IColorModel} from '@paint-bucket/core';
import {rgbToXyz} from './xyz-rgb';

export const MAX_X = 95.047;
export const MAX_Z = 108.883;

/**
 * XYZa color model definition.
 */
export const XYZ: IColorModel<IXyz> = {
  createColor: createXyz,
  isColor: isXyz,
  componentsToRgb() {
    throw new Error('Not implemented');
  },
  rgbToComponents: rgbToXyz,
};

export interface IXyz {

  type: 'xyz',

  /**
   * X ∈ [0, 95.047].
   */
  X: number;

  /**
   * Y ∈ [0, 100].
   */
  Y: number;

  /**
   * Z ∈ [0, 108.883].
   */
  Z: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

export function isXyz(value: any): value is IXyz {
  return value?.type === 'xyz';
}

/**
 * Creates black color in XYZa color model.
 */
export function createXyz(): IXyz;

/**
 * Creates a color in XYZa color model.
 *
 * @param X X ∈ [0, 95.047].
 * @param Y Y ∈ [0, 100].
 * @param Z Z ∈ [0, 108.883].
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function createXyz(X: number, Y: number, Z: number, a?: number): IXyz;

export function createXyz(X = 0, Y = 0, Z = 0, a = 1): IXyz {
  return {type: 'xyz', X, Y, Z, a};
}
