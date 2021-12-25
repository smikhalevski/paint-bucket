import {IRgb} from './rgb';

export interface IColorSpace<C = unknown> {

  createColor(): C;

  isColor(value: unknown): value is C;

  colorToRgb(color: C, rgb: IRgb): void;

  rgbToColor(rgb: IRgb, color: C): void;
}
