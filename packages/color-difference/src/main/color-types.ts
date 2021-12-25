import {Rgb} from './colors';
import {Int64} from '@paint-bucket/core/src/main/data-types';

export type RawColor = Int64;

export interface IColor {

  setRgbToThis(rgb: Rgb): void;

  setThisToRgb(rgb: Rgb): void;

  setRawColor(rawColor: number): void;

  getRawColor(): RawColor;
}
