import {composeBytes, getColorByte} from '../raw-color-utils';
import {Byte, FF} from '../int64';
import {ColorSpace, IColor, RawColor} from './color-types';

export class Rgb implements IColor {

  public readonly colorSpace = ColorSpace.RGB;

  public R;
  public G;
  public B;
  public a;

  /**
   * Creates a color in RGBa color space.
   *
   * @param R Red ∈ [0, 255].
   * @param G Green ∈ [0, 255].
   * @param B Blue ∈ [0, 255].
   * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public constructor(R: Byte, G: Byte, B: Byte, a = 1) {
    this.R = R;
    this.G = G;
    this.B = B;
    this.a = a;
  }

  public setRawColor(rawColor: number): this {
    this.R = getColorByte(rawColor, 0);
    this.G = getColorByte(rawColor, 1);
    this.B = getColorByte(rawColor, 2);
    this.a = getColorByte(rawColor, 3) / FF;
    return this;
  }

  public getRawColor(): RawColor {
    return composeBytes(ColorSpace.RGB, this.R, this.G, this.B, FF * this.a);
  }
}
