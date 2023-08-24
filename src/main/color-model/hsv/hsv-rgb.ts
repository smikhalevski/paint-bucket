import { RGB } from '../../core';
import { HSV } from './hsv';

const { min, max, floor } = Math;

/**
 * Convert RGBa to HSVa.
 */
export function convertRGBToHSV(rgb: RGB, hsv: HSV): HSV {
  const [R, G, B] = rgb;

  const V = max(R, G, B);
  const d = V - min(R, G, B);

  const S = V === 0 ? 0 : d / V;

  let H = 0;

  if (d !== 0) {
    switch (V) {
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

  hsv[0] = H;
  hsv[1] = S;
  hsv[2] = V;
  hsv[3] = rgb[3];

  return hsv;
}

/**
 * Convert HSVa to RGBa.
 */
export function convertHSVToRGB(hsv: HSV, rgb: RGB): RGB {
  const [H, S, V] = hsv;

  const i = floor(H);
  const f = H - i;
  const p = V * (1 - S);
  const q = V * (1 - f * S);
  const t = V * (1 - (1 - f) * S);

  let B = 0;
  let G = 0;
  let R = 0;

  switch (i % 6) {
    case 0:
      R = V;
      G = t;
      B = p;
      break;
    case 1:
      R = q;
      G = V;
      B = p;
      break;
    case 2:
      R = p;
      G = V;
      B = t;
      break;
    case 3:
      R = p;
      G = q;
      B = V;
      break;
    case 4:
      R = t;
      G = p;
      B = V;
      break;
    case 5:
      R = V;
      G = p;
      B = q;
      break;
  }

  rgb[0] = R;
  rgb[1] = G;
  rgb[2] = B;
  rgb[3] = hsv[3];

  return rgb;
}
