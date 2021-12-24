import {composeChannels, getColorChannel} from '../channel-utils';
import {FF} from '../int64';
import {IColor, RawColor} from '../color-types';
import {Rgb} from './Rgb';
import {hslToRgb, rgbToHsl} from './rgb-hsl';

export class Hsl implements IColor {

  /**
   * Hue ∈ [0, 360].
   */
  public H;

  /**
   * Saturation ∈ [0, 100].
   */
  public S;

  /**
   * Lightness ∈ [0, 100], 0 = black, 1 = white.
   */
  public L;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public a;

  /**
   * Creates black color in HSLa color space.
   */
  public constructor();

  /**
   * Creates a color in HSLa color space.
   *
   * @param H Hue ∈ [0, 360].
   * @param S Saturation ∈ [0, 100].
   * @param L Lightness ∈ [0, 100], 0 = black, 1 = white.
   * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public constructor(H: number, S: number, L: number, a?: number);

  public constructor(H = 0, S = 0, L = 0, a = 1) {
    this.H = H;
    this.S = S;
    this.L = L;
    this.a = a;
  }

  public setRgbToThis(rgb: Rgb): void {
    rgbToHsl(rgb, this);
  }

  public setThisToRgb(rgb: Rgb): void {
    hslToRgb(this, rgb);
  }

  public setRawColor(rawColor: number): void {
    this.H = getColorChannel(rawColor, 0) / FF * 360;
    this.S = getColorChannel(rawColor, 1) / FF * 100;
    this.L = getColorChannel(rawColor, 2) / FF * 100;
    this.a = getColorChannel(rawColor, 3) / FF;
  }

  public getRawColor(): RawColor {
    return composeChannels(
        FF * this.H / 360,
        FF * this.S / 100,
        FF * this.L / 100,
        FF * this.a,
    );
  }
}
