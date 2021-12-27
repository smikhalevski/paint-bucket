import {IRgb} from '@paint-bucket/core';
import {IHsv} from './hsv';

/**
 * Convert RGBa to HSVa.
 */
export function rgbToHsv(rgb: IRgb, hsv: IHsv): IHsv {
  const {R, G, B} = rgb;

  const V = Math.max(R, G, B);
  const d = V - Math.min(R, G, B);

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

  hsv.H = H;
  hsv.S = S;
  hsv.V = V;
  hsv.a = rgb.a;

  return hsv;
}

/**
 * Convert HSVa to RGBa.
 */
export function hsvToRgb(hsv: IHsv, rgb: IRgb): IRgb {
  const {H, S, V} = hsv;

  const i = Math.floor(H);
  const f = H - i;
  const p = V * (1 - S);
  const q = V * (1 - f * S);
  const t = V * (1 - (1 - f) * S);

  let B = 0;
  let G = 0;
  let R = 0;

  switch (i % 6) {
    case 0:
      R = p;
      G = t;
      B = V;
      break;
    case 1:
      R = p;
      G = V;
      B = q;
      break;
    case 2:
      R = t;
      G = V;
      B = p;
      break;
    case 3:
      R = V;
      G = q;
      B = p;
      break;
    case 4:
      R = V;
      G = p;
      B = t;
      break;
    case 5:
      R = q;
      G = p;
      B = V;
      break;
  }

  rgb.R = R;
  rgb.G = G;
  rgb.B = B;
  rgb.a = hsv.a;

  return rgb;
}
