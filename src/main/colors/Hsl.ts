import {composeBytes, getColorByte} from '../raw-color-utils';
import {FF} from '../int64';
import {ColorSpace, IColor, RawColor} from './color-types';

export class Hsl implements IColor {

  public readonly colorSpace = ColorSpace.HSL;

  public H;
  public S;
  public L;
  public a;

  /**
   * Creates a color in HSLa color space.
   *
   * @param H Hue ∈ [0, 360].
   * @param S Saturation ∈ [0, 100].
   * @param L Lightness ∈ [0, 100], 0 = black, 1 = white.
   * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public constructor(H: number, S: number, L: number, a = 1) {
    this.H = H;
    this.S = S;
    this.L = L;
    this.a = a;
  }

  public setRawColor(rawColor: number): this {
    this.H = getColorByte(rawColor, 0) / FF * 360;
    this.S = getColorByte(rawColor, 1) / FF * 100;
    this.L = getColorByte(rawColor, 2) / FF * 100;
    this.a = getColorByte(rawColor, 3) / FF;
    return this;
  }

  public getRawColor(): RawColor {
    return composeBytes(
        ColorSpace.HSL,
        FF * this.H / 360,
        FF * this.S / 100,
        FF * this.L / 100,
        FF * this.a,
    );
  }
}
