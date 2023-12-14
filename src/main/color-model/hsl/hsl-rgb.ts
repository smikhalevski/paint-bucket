import { RGB } from '../../rgb';
import { HSL } from './hsl';

const { min, max } = Math;

/**
 * Convert RGBa to HSLa.
 */
export function convertRGBToHSL(rgb: RGB, hsl: HSL): HSL {
  const [R, G, B] = rgb;

  const x = max(R, G, B);
  const y = min(R, G, B);
  const d = x - y;
  const p = x + y;

  let H = 0;
  let S = 0;
  let L = p / 2;

  if (d !== 0) {
    S = L > 0.5 ? d / (2 - p) : d / p;

    if (x === R) {
      H = ((G - B) / d + (G < B ? 6 : 0)) / 6;
    } else if (x === G) {
      H = ((B - R) / d + 2) / 6;
    } else {
      H = ((R - G) / d + 4) / 6;
    }
  }

  hsl[0] = H;
  hsl[1] = S;
  hsl[2] = L;
  hsl[3] = rgb[3];

  return hsl;
}

/**
 * Convert HSLa to RGBa.
 */
export function convertHSLToRGB(hsl: HSL, rgb: RGB): RGB {
  const [H, S, L] = hsl;

  let R = L;
  let G = L;
  let B = L;
  let q, p;

  if (S !== 0) {
    q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    p = 2 * L - q;

    R = convertHueToRGB(p, q, H + 1 / 3);
    G = convertHueToRGB(p, q, H);
    B = convertHueToRGB(p, q, H - 1 / 3);
  }

  rgb[0] = R;
  rgb[1] = G;
  rgb[2] = B;
  rgb[3] = hsl[3];

  return rgb;
}

function convertHueToRGB(p: number, q: number, t: number): number {
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
