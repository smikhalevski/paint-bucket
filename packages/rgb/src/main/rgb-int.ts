import {composeComponents, getColorComponent} from '@paint-bucket/core/lib/component-utils';
import {IRgb} from './rgb';

export function intToRgb(color: number, rgb: IRgb): IRgb {
  rgb.R = getColorComponent(color, 0);
  rgb.G = getColorComponent(color, 1);
  rgb.B = getColorComponent(color, 2);
  rgb.a = getColorComponent(color, 3) / 0xFF;
  return rgb;
}

export function rgbToInt(rgb: IRgb): number {
  return composeComponents(rgb.R, rgb.G, rgb.B, 0xFF * rgb.a);
}
