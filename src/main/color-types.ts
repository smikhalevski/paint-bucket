import {Int64} from './int64';
import {Rgb} from './colors';

export type RawColor = Int64;

export interface IColor {

  setRgbToThis(rgb: Rgb): void;

  setThisToRgb(rgb: Rgb): void;

  setRawColor(rawColor: number): void;

  getRawColor(): RawColor;
}
