import {composeChannels, getColorChannel} from '@paint-bucket/core/src/main/channel-utils';
import {FF} from '@paint-bucket/core/src/main/int64';
import {IColor, RawColor} from '../color-types';
import {Rgb} from './Rgb';
import {rgbToXyz} from './rgb-xyz';

export class Xyz implements IColor {

  public static MAX_X = 95.047;
  public static MAX_Z = 108.883;

  /**
   * X ∈ [0, 95.047].
   */
  public X;

  /**
   * Y ∈ [0, 100].
   */
  public Y;

  /**
   * Z ∈ [0, 108.883].
   */
  public Z;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public a;

  /**
   * Creates black color in XYZa color space.
   */
  public constructor();

  /**
   * Creates a color in XYZa color space.
   *
   * @param X X ∈ [0, 95.047].
   * @param Y Y ∈ [0, 100].
   * @param Z Z ∈ [0, 108.883].
   * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public constructor(X: number, Y: number, Z: number, a?: number);

  public constructor(X = 0, Y = 0, Z = 0, a = 1) {
    this.X = X;
    this.Y = Y;
    this.Z = Z;
    this.a = a;
  }

  public setRgbToThis(rgb: Rgb): void {
    rgbToXyz(rgb, this);
  }

  public setThisToRgb(rgb: Rgb): void {
    throw new Error('Not supported');
  }

  public setRawColor(rawColor: number): void {
    this.X = getColorChannel(rawColor, 0) / FF * Xyz.MAX_X;
    this.Y = getColorChannel(rawColor, 1) / FF * 100;
    this.Z = getColorChannel(rawColor, 2) / FF * Xyz.MAX_Z;
    this.a = getColorChannel(rawColor, 3) / FF;
  }

  public getRawColor(): RawColor {
    return composeChannels(
        FF * this.X / Xyz.MAX_X,
        FF * this.Y / 100,
        FF * this.Z / Xyz.MAX_Z,
        FF * this.a,
    );
  }
}
