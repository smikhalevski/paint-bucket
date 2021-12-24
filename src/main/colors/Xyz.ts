import {composeBytes, getColorByte} from '../raw-color-utils';
import {FF} from '../int64';
import {ColorSpace, IColor, RawColor} from './color-types';

export class Xyz implements IColor {

  public static MAX_X = 95.047;
  public static MAX_Z = 108.883;

  public readonly colorSpace = ColorSpace.XYZ;

  public X;
  public Y;
  public Z;
  public a;

  /**
   * Creates a color in XYZ color space.
   *
   * @param X X ∈ [0, 95.047].
   * @param Y Y ∈ [0, 100].
   * @param Z Z ∈ [0, 108.883].
   * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public constructor(X: number, Y: number, Z: number, a = 1) {
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.a = a;
  }

  public setRawColor(rawColor: number): this {
    this.X = getColorByte(rawColor, 0) / FF * Xyz.MAX_X;
    this.Y = getColorByte(rawColor, 1) / FF * 100;
    this.Z = getColorByte(rawColor, 2) / FF * Xyz.MAX_Z;
    this.a = getColorByte(rawColor, 3) / FF;
    return this;
  }

  public getRawColor(): RawColor {
    return composeBytes(
        ColorSpace.XYZ,
        FF * this.X / Xyz.MAX_X,
        FF * this.Y / 100,
        FF * this.Z / Xyz.MAX_Z,
        FF * this.a,
    );
  }
}
