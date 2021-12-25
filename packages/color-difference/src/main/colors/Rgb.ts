import {composeChannels, getColorChannel} from '../channel-utils';
import {Byte, FF} from '../int64';
import {IColor, RawColor} from '../color-types';

export class Rgb implements IColor {

  /**
   * Red ∈ [0, 255].
   */
  public R;

  /**
   * Green ∈ [0, 255].
   */
  public G;

  /**
   * Blue ∈ [0, 255].
   */
  public B;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public a;

  /**
   * Creates black color in RGBa color space.
   */
  public constructor();

  /**
   * Creates a color in RGBa color space.
   *
   * @param R Red ∈ [0, 255].
   * @param G Green ∈ [0, 255].
   * @param B Blue ∈ [0, 255].
   * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public constructor(R: Byte, G: Byte, B: Byte, a?: number);

  public constructor(R = 0, G = 0, B = 0, a = 1) {
    this.R = R;
    this.G = G;
    this.B = B;
    this.a = a;
  }

  public setRgbToThis(rgb: Rgb): void {
    if (this === rgb) {
      return;
    }
    this.R = rgb.R;
    this.G = rgb.G;
    this.B = rgb.B;
    this.a = rgb.a;
  }

  public setThisToRgb(rgb: Rgb): void {
    if (this === rgb) {
      return;
    }
    rgb.R = this.R;
    rgb.G = this.G;
    rgb.B = this.B;
    rgb.a = this.a;
  }

  public setRawColor(rawColor: number): void {
    this.R = getColorChannel(rawColor, 0);
    this.G = getColorChannel(rawColor, 1);
    this.B = getColorChannel(rawColor, 2);
    this.a = getColorChannel(rawColor, 3) / FF;
  }

  public getRawColor(): RawColor {
    return composeChannels(this.R, this.G, this.B, FF * this.a);
  }
}
