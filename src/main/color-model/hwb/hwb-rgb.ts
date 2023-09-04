import { RGB } from '../../core';
import { HWB } from './hwb';

const { min, max, floor } = Math;

/**
 * Convert RGBa to HWBa.
 */
export function convertRGBToHWB(rgb: RGB, hwb: HWB): HWB {
  const [R, G, B] = rgb;

  const x = max(R, G, B);
  const y = min(R, G, B);
  const d = x - y;

  let H;

  if (d === 0) {
    H = 0;
  } else if (x === R) {
    H = ((G - B) / d + (G < B ? 6 : 0)) / 6;
  } else if (x === G) {
    H = ((B - R) / d + 2) / 6;
  } else {
    H = ((R - G) / d + 4) / 6;
  }

  hwb[0] = H;
  hwb[1] = y;
  hwb[2] = 1 - x;
  hwb[3] = rgb[3];

  return hwb;
}

/**
 * Convert HWBa to RGBa.
 */
export function convertHWBToRGB(hwb: HWB, rgb: RGB): RGB {
  const [H, W, K] = hwb;

  const i = floor(6 * H);
  const p = 1 - K;
  const q = W + ((i & 1) === 0 ? 6 * H - i : 1 - 6 * H + i) * (p - W);

  let R, G, B;

  switch (i) {
    default:
    case 6:
    case 0:
      R = p;
      G = q;
      B = W;
      break;
    case 1:
      R = q;
      G = p;
      B = W;
      break;
    case 2:
      R = W;
      G = p;
      B = q;
      break;
    case 3:
      R = W;
      G = q;
      B = p;
      break;
    case 4:
      R = q;
      G = W;
      B = p;
      break;
    case 5:
      R = p;
      G = W;
      B = q;
      break;
  }

  rgb[0] = R;
  rgb[1] = G;
  rgb[2] = B;
  rgb[3] = hwb[3];

  return rgb;
}
