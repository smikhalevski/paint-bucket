import {Int64} from '../int64';
import {Hsl} from './Hsl';
import {Lab} from './Lab';
import {Xyz} from './Xyz';
import {Rgb} from './Rgb';

// 4 bytes
export const enum ColorSpace {
  RGB = 0,
  HSL = 1,
  XYZ = 3,
  LAB = 4,
}

export type RawColor = Int64;

export type Color = Hsl | Lab | Rgb | Xyz;

export interface IColor {

  readonly colorSpace: ColorSpace;

  setRawColor(rawColor: number): this;

  getRawColor(): RawColor;
}
