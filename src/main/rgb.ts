import {ColorModel, fromOctets, getColorModel, getColorOctet} from './octets';
import {max, min} from './int';
import {sqrt} from './math';

const blackRgb = rgb(0, 0, 0);
const blackHsl = hsl(0, 0, 0);

export function rgb(r: number, g: number, b: number, alpha = 1): number {
  return fromOctets(ColorModel.RGB, r, g, b, 0xFF * alpha);
}

export function hsl(h: number, s: number, l: number, alpha = 1): number {
  return fromOctets(ColorModel.HSL, h, s, l, 0xFF * alpha);
}

export function isRgb(color: number): boolean {
  return getColorModel(color) === ColorModel.RGB;
}

export function isHsl(color: number): boolean {
  return getColorModel(color) === ColorModel.HSL;
}

export function toRgb(color: number): number {
  return isRgb(color) ? color : isHsl(color) ? hslToRgb(color) : blackRgb;
}

export function toHsl(color: number): number {
  return isHsl(color) ? color : isRgb(color) ? rgbToHsl(color) : blackHsl;
}

export function rgbToHsl(rgb: number): number {
  let r = getColorOctet(rgb, 0);
  let g = getColorOctet(rgb, 1);
  let b = getColorOctet(rgb, 2);

  r /= 0xFF;
  g /= 0xFF;
  b /= 0xFF;

  const A = max(r, max(g, b));
  const B = min(r, min(g, b));
  const l = (A + B) / 2;

  let h = 0;
  let s = 0;

  if (A !== B) {
    const d = A - B;
    s = l > 0.5 ? d / (2 - A - B) : d / (A + B);

    switch (A) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return fromOctets(ColorModel.HSL, 0xFF * h, 0xFF * s, 0xFF * l, getColorOctet(rgb, 3));
}

export function hslToRgb(hsl: number): number {
  const h = getColorOctet(hsl, 0) / 0xFF;
  const s = getColorOctet(hsl, 0) / 0xFF;
  const l = getColorOctet(hsl, 0) / 0xFF;

  let r = l;
  let g = l;
  let b = l;

  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return fromOctets(ColorModel.RGB, 0xFF * r, 0xFF * g, 0xFF * b, getColorOctet(hsl, 3));
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

/**
 * Returns `true` if colors are exactly equal.
 */
export function isEqualColor(color1: number, color2: number, ignoreOpacity = true): boolean {
  if (color1 === color2) {
    return true;
  }

  const rgb1 = toRgb(color1);
  const rgb2 = toRgb(color2);

  return ignoreOpacity ? (rgb1 / 0x10000 | 0) === (rgb2 / 0x10000 | 0) : rgb1 === rgb2;
}

/**
 * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation.
 *
 * @see http://alienryderflex.com/hsp.html
 */
export function toGrayscale(color: number): number {
  let rgb = toRgb(color);

  const r = getColorOctet(rgb, 0);
  const g = getColorOctet(rgb, 1);
  const b = getColorOctet(rgb, 2);

  const a = sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);

  rgb = fromOctets(ColorModel.RGB, a, a, a, getColorOctet(rgb, 3));

  return isHsl(color) ? rgbToHsl(rgb) : rgb;
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(color: number): boolean {
  return getColorOctet(toGrayscale(toRgb(color)), 0) < 127.5;
}
