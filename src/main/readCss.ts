import {hsl, rgb} from './color-factory';
import {IHsl, IRgb} from './color-types';

const tempRgb = rgb(0, 0, 0);

const tempHsl = hsl(0, 0, 0);

const rgbRe = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/;

const hslRe = /^hsla?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/;

export function readCss(color: string): IRgb | IHsl | undefined {

  const rgbMatch = color.match(rgbRe);
  if (rgbMatch) {
    tempRgb.r = parseInt(rgbMatch[1], 10);
    tempRgb.g = parseInt(rgbMatch[2], 10);
    tempRgb.b = parseInt(rgbMatch[3], 10);
    tempRgb.alpha = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;

    return tempRgb;
  }

  const hslMatch = color.match(hslRe);
  if (hslMatch) {
    tempHsl.h = parseInt(hslMatch[1], 10);
    tempHsl.s = parseInt(hslMatch[2], 10);
    tempHsl.l = parseInt(hslMatch[3], 10);
    tempHsl.alpha = hslMatch[4] ? parseFloat(hslMatch[4]) : 1;

    return tempHsl;
  }
}
