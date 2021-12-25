import {IRgb} from './rgb';

// Max value 0xFF
export type Byte = number;

// Max value 0x1F_FF_FF_FF_FF_FF_FF
export type Int64 = number;

export interface IColorSpace<C = unknown> {

  createColor(): C;

  isColor(value: unknown): value is C;

  colorToRgb(color: C, rgb: IRgb): void;

  rgbToColor(rgb: IRgb, color: C): void;
}
