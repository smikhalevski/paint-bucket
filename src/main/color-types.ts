import {Int} from './int';

// 4 bytes
export const enum ColorSpace {
  RGB = 0,
  HSL = 1,
  XYZ = 3,
  LAB = 4,
}

export type Color =
    | IRgbColor
    | IHslColor
    | ILabColor
    | IXyzColor

export type PackedColor = Int;

export interface IColor {

  /**
   * The color space in which the color components are defined.
   */
  colorSpace: ColorSpace;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque
   */
  a: number;
}

export interface IRgbColor extends IColor {
  colorSpace: ColorSpace.RGB;

  /**
   * Red ∈ [0, 255].
   */
  R: number;

  /**
   * Green ∈ [0, 255].
   */
  G: number;

  /**
   * Blue ∈ [0, 255].
   */
  B: number;
}

export interface IHslColor extends IColor {
  colorSpace: ColorSpace.HSL;

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
}

export interface ILabColor extends IColor {
  colorSpace: ColorSpace.LAB;

  /**
   * L ∈ [0, 100].
   */
  L: number;

  /**
   * a ∈ [-128, 128].
   */
  A: number;

  /**
   * b ∈ [-128, 128].
   */
  B: number;
}

export interface IXyzColor extends IColor {
  colorSpace: ColorSpace.XYZ;

  /**
   * X ∈ [0, 1].
   */
  X: number;

  /**
   * Y ∈ [0, 1].
   */
  Y: number;

  /**
   * Z ∈ [0, 1].
   */
  Z: number;
}
