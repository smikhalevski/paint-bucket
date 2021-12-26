import {composeComponents, getColorComponent} from '@paint-bucket/core';
import {IHsl} from './hsl';

export function intToHsl(color: number, hsl: IHsl): IHsl {
  hsl.H = getColorComponent(color, 0) / 0xFF * 360;
  hsl.S = getColorComponent(color, 1) / 0xFF * 100;
  hsl.L = getColorComponent(color, 2) / 0xFF * 100;
  hsl.a = getColorComponent(color, 3) / 0xFF;
  return hsl;
}

export function hslToInt(hsl: IHsl): number {
  return composeComponents(
      0xFF * hsl.H / 360,
      0xFF * hsl.S / 100,
      0xFF * hsl.L / 100,
      0xFF * hsl.a,
  );
}
