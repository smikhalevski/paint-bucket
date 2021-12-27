import {composeComponents, getColorComponent} from '@paint-bucket/core';
import {IHsl} from './hsl';

export function intToHsl(color: number, hsl: IHsl): IHsl {
  hsl.H = getColorComponent(color, 0) / 0xFF;
  hsl.S = getColorComponent(color, 1) / 0xFF;
  hsl.L = getColorComponent(color, 2) / 0xFF;
  hsl.a = getColorComponent(color, 3) / 0xFF;
  return hsl;
}

export function hslToInt(hsl: IHsl): number {
  return composeComponents(
      hsl.H * 0xFF,
      hsl.S * 0xFF,
      hsl.L * 0xFF,
      hsl.a * 0xFF,
  );
}
