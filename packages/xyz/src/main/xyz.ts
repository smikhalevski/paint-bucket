import {IColorModel} from '@paint-bucket/core';
import {rgbToXyz, xyzToRgb} from './xyz-rgb';

export const MAX_X = 95.047;
export const MAX_Z = 108.883;

/**
 * XYZa color model definition.
 */
export const XYZ: IColorModel<IXyz> = {
  createComponents: createXyz,
  cloneComponents: (xyz) => copyXyz(xyz, createXyz()),
  componentsToRgb: xyzToRgb,
  rgbToComponents: rgbToXyz,
};

export interface IXyz {

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
  return {X, Y, Z, a};
}

export function copyXyz(xyz1: IXyz, xyz2: IXyz): IXyz {
  xyz2.X = xyz1.X;
  xyz2.Y = xyz1.Y;
  xyz2.Z = xyz1.Z;
  xyz2.a = xyz1.a;
  return xyz2;
}
