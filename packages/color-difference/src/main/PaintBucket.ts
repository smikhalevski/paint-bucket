import {IColor} from './color-types';
import {Lab, Rgb} from './colors';

export class PaintBucket {

  private _colors: Map<new () => IColor, IColor> | undefined;
  private _color: IColor | undefined;
  private _rgb: Rgb | undefined;

  constructor(color?: IColor) {
    this._color = color instanceof Rgb ? this._rgb = color : color;
  }

  protected takeForUpdate<T extends IColor>(colorSpace: new () => T): T {
    if (this._color instanceof colorSpace) {
      return this._color;
    }
    this._colors = new Map();

    let color = this._colors.get(colorSpace);
    if (!color) {
      color = new colorSpace();
      this._colors.set(colorSpace, color);
    }

    if (!this._rgb) {
      if (colorSpace as unknown === Rgb) {
        this._rgb = color as Rgb;
      } else {
        this._rgb ||= new Rgb();
      }
    }

    if (this._color) {
      this._color.setThisToRgb(this._rgb);
    }
    if (color !== this._rgb) {
      color.setRgbToThis(this._rgb);
    }
    this._color = color;
    return color as T;
  }
}


export function color(): PaintBucket {
  return new PaintBucket();
}


export interface PaintBucket {
  asd(foo: number): this;
}

PaintBucket.prototype.asd = function (this: PaintBucket, foo) {
  const lab = this.takeForUpdate(Lab);
  return this;
};


color().asd(123);

