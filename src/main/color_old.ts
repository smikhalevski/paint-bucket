import {ColorLike, IHsl, IRgb} from './color-objects';
import {max, min, round, sqrt} from './math';
import {hsl, rgb} from './color-factory';

const tempRgb = rgb(0, 0, 0);

const tempHsl = hsl(0, 0, 0);

const cssRgbRe = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/;

const cssHslRe = /^hsla?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/;

export function rgbToHex(rgb: IRgb): string {
  const {r, g, b} = rgb;
  const bits =
      (1 << 24) +
      (r << 16) +
      (g << 8) +
      b;

  return bits.toString(16).substr(1, 6);
}

export function rgbToShortHex(rgb: IRgb): string {
  const {r, g, b} = rgb;
  const r1 = r >> 4;
  const g1 = g >> 4;
  const b1 = b >> 4;

  if (
      (r1 << 4 | r1) === r &&
      (g1 << 4 | g1) === g &&
      (b1 << 4 | b1) === b
  ) {
    const bits =
        (1 << 12) +
        (r1 << 8) +
        (g1 << 4) +
        b1;

    return bits.toString(16).substr(1, 3);
  }

  return rgbToHex(rgb);
}




export function hslToHex(hsl: IHsl): string {
  return rgbToHex(hslToRgb(hsl, tempRgb));
}

export function hslToCss(hsl: IHsl): string {
  return rgbToCss(hslToRgb(hsl, tempRgb));
}

export function rgbToCss(rgb: IRgb): string {
  const {r, g, b, alpha} = rgb;
  return alpha < 1 ? `rgba(${r | 0},${g | 0},${b | 0},${alpha.toPrecision(2)})` : `#${rgbToHex(rgb)}`;
}
