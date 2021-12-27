import {IRgb} from '@paint-bucket/core';
import {IHsl} from './hsl';

/**
 * Convert RGBa to HSLa.
 */
export function rgbToHsl(rgb: IRgb, hsl: IHsl): IHsl {
  const {R, G, B} = rgb;

  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const d = max - min;
  const p = max + min;

  let H = 0;
  let S = 0;
  let L = p / 2;

  if (d !== 0) {
    S = L > 0.5 ? d / (2 - p) : d / p;

    switch (max) {
      case R:
        H = (G - B) / d + (G < B ? 6 : 0);
        break;
      case G:
        H = (B - R) / d + 2;
        break;
      case B:
        H = (R - G) / d + 4;
        break;
    }

    H /= 6;
  }

  hsl.H = H;
  hsl.S = S;
  hsl.L = L;
  hsl.a = rgb.a;

  return hsl;
}

/**
 * Convert HSLa to RGBa.
 */
export function hslToRgb(hsl: IHsl, rgb: IRgb): IRgb {
  const {H, S, L} = hsl;

  let R = L;
  let G = L;
  let B = L;

  if (S !== 0) {
    const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    const p = 2 * L - q;

    R = hueToRgb(p, q, H + 1 / 3);
    G = hueToRgb(p, q, H);
    B = hueToRgb(p, q, H - 1 / 3);
  }

  rgb.R = R;
  rgb.G = G;
  rgb.B = B;
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
