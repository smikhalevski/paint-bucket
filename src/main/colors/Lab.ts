import {composeBytes, getColorByte} from '../raw-color-utils';
import {FF} from '../int64';
import {ColorSpace, IColor, RawColor} from './color-types';

export class Lab implements IColor {

  public readonly colorSpace = ColorSpace.LAB;

  public L;
  public A;
  public B;
  public a;

  /**
   * Creates a color in CIELAB color space.
   *
   * @param L L* ∈ [0, 100].
   * @param A a* ∈ [-128, 128].
   * @param B b* ∈ [-128, 128].
   * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public constructor(L: number, A: number, B: number, a = 1) {
    this.L = L;
    this.A = A;
    this.B = B;
    this.a = a;
  }

  public setRawColor(rawColor: number): this {
    this.L = getColorByte(rawColor, 0) / FF * 100;
    this.A = getColorByte(rawColor, 1) - 128;
    this.B = getColorByte(rawColor, 2) - 128;
    this.a = getColorByte(rawColor, 3) / FF;
    return this;
  }

  public getRawColor(): RawColor {
    return composeBytes(
        ColorSpace.LAB,
        FF * this.L / 100,
        this.A + 128,
        this.B + 128,
        FF * this.a,
    );
  }
}
