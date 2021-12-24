import {composeChannels, getColorChannel} from '../channel-utils';
import {FF} from '../int64';
import {IColor, RawColor} from '../color-types';
import {Rgb} from './Rgb';
import {xyzToLab} from './xyz-lab';
import {rgbToXyz} from './rgb-xyz';
import {Xyz} from './Xyz';

export class Lab implements IColor {

  /**
   * L* ∈ [0, 100].
   */
  public L;

  /**
   * a* ∈ [-128, 128].
   */
  public A;

  /**
   * b* ∈ [-128, 128].
   */
  public B;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public a;

  /**
   * Creates black color in CIELAB color space.
   */
  public constructor();

  /**
   * Creates a color in CIELAB color space.
   *
   * @param L L* ∈ [0, 100].
   * @param A a* ∈ [-128, 128].
   * @param B b* ∈ [-128, 128].
   * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  public constructor(L: number, A: number, B: number, a?: number);

  public constructor(L = 0, A = 0, B = 0, a = 1) {
    this.L = L;
    this.A = A;
    this.B = B;
    this.a = a;
  }

  public setThisToRgb(rgb: Rgb): void {
    throw new Error('Not supported');
  }

  public setRgbToThis(rgb: Rgb): void {
    xyzToLab(rgbToXyz(rgb, new Xyz()), this);
  }

  public setRawColor(rawColor: number): void {
    this.L = getColorChannel(rawColor, 0) / FF * 100;
    this.A = getColorChannel(rawColor, 1) - 128;
    this.B = getColorChannel(rawColor, 2) - 128;
    this.a = getColorChannel(rawColor, 3) / FF;
  }

  public getRawColor(): RawColor {
    return composeChannels(
        FF * this.L / 100,
        this.A + 128,
        this.B + 128,
        FF * this.a,
    );
  }
}
