import {IColorSpace} from './core-types';
import {IRgb, RGB} from './rgb';

export class PaintBucket {

  protected color?: unknown;
  protected colorSpace?: IColorSpace;

  private _rgb?: IRgb;
  private _allocatedColors?: Map<IColorSpace, any>;

  protected forColorSpace<C>(colorSpace: IColorSpace<C>): C {
    const currColor = this.color;

    if (colorSpace.isColor(currColor)) {
      return currColor;
    }

    const allocatedColors = this._allocatedColors ||= new Map<IColorSpace, any>();

    let nextColor = allocatedColors.get(colorSpace);

    if (!nextColor) {
      nextColor = colorSpace.createColor();
      allocatedColors.set(colorSpace, nextColor);
    }

    this._rgb ||= RGB.isColor(nextColor) ? nextColor : RGB.createColor();

    if (currColor) {
      this.colorSpace?.colorToRgb(currColor, this._rgb);
    }
    colorSpace.rgbToColor(this._rgb, nextColor);

    this.color = nextColor;
    this.colorSpace = colorSpace;

    return nextColor;
  }
}
