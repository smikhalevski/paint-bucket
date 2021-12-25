import {IRgb} from './rgb';

export interface IColor<T> {
  type: T;
}

export interface IColorSpace<C extends IColor<T>, T> {

  type: T;

  create(): C;

  colorToRgb(color: C, rgb: IRgb): void;

  rgbToColor(rgb: IRgb, color: C): void;
}
