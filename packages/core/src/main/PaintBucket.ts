import {IColorSpace} from './core-types';
import {IRgb, rgbColorSpace} from './rgb';

export class PaintBucket {

  private _rgb?: IRgb;
  private _color?: unknown;
  private _colorSpace?: IColorSpace;
  private _allocatedColors?: Map<IColorSpace, any>;

  protected forColorSpace<C>(colorSpace: IColorSpace<C>): C {
    const currColor = this._color;

    if (colorSpace.isColor(currColor)) {
      return currColor;
    }

    const allocatedColors = this._allocatedColors ||= new Map<IColorSpace, unknown>();

    let nextColor = allocatedColors.get(colorSpace);

    if (!nextColor) {
      nextColor = colorSpace.createColor();
      allocatedColors.set(colorSpace, nextColor);
    }

    this._rgb ||= rgbColorSpace.isColor(nextColor) ? nextColor : rgbColorSpace.createColor();

    if (currColor) {
      this._colorSpace?.colorToRgb(currColor, this._rgb);
    }
    colorSpace.rgbToColor(this._rgb, nextColor);

    this._color = nextColor;
    this._colorSpace = colorSpace;

    return nextColor;
  }
}
