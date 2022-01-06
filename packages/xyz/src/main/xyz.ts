import {ColorModel} from '@paint-bucket/core';
import {rgbToXyz, xyzToRgb} from './xyz-rgb';

/**
 * CIE 1931 XYZa color model definition.
 */
export const XYZ: ColorModel<IXyz> = {
  createComponents: createXyz,
  cloneComponents: (xyz) => copyXyz(xyz, createXyz()),
  componentsToRgb: xyzToRgb,
  rgbToComponents: rgbToXyz,
};

/**
 * XYZ is an additive color model based on how the eye interprets stimulus from light. Unlike other additive RGB like
 * color model, XYZ is a purely mathematical model. The primary components are "imaginary," meaning you can't create
 * the represented color in the physical by shining any lights representing X, Y, and Z.
 *
 * @see http://www.colourphil.co.uk/xyz_colour_space.shtml
 * @see http://dougkerr.net/pumpkin/articles/CIE_XYZ.pdf
 */
export interface IXyz {

  /**
   * Chromaticity of X ∈ [0, 1].
   */
  X: number;

  /**
   * Chromaticity of Y ∈ [0, 1].
   */
  Y: number;

  /**
   * Chromaticity of Z ∈ [0, 1].
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
 * @param X Chromaticity of X ∈ [0, 1].
 * @param Y Chromaticity of Y ∈ [0, 1].
 * @param Z Chromaticity of Z ∈ [0, 1].
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
