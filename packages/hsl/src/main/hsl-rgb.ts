import {IRgb} from '@paint-bucket/core';
import {IHsl} from './hsl';

export function rgbToHsl(rgb: IRgb, hsl: IHsl): IHsl {

  const r = rgb.R / 0xFF;
  const g = rgb.G / 0xFF;
  const b = rgb.B / 0xFF;

  const A = Math.max(r, g, b);
  const B = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  let l = (A + B) / 2;

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

  hsl.H = h * 360;
  hsl.S = s * 100;
  hsl.L = l * 100;
  hsl.a = rgb.a;

  return hsl;
}

export function hslToRgb(hsl: IHsl, rgb: IRgb): IRgb {
  const h = hsl.H / 360;
  const s = hsl.S / 100;
  const l = hsl.L / 100;

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

  rgb.R = r * 0xFF;
  rgb.G = g * 0xFF;
  rgb.B = b * 0xFF;
  rgb.a = hsl.a;

  return rgb;
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