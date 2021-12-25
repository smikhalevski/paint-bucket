import {IRgb} from './rgb';

/**
 * Assign channels from `rgb1` to `rgb2`.
 */
export function rgbToRgb(rgb1: IRgb, rgb2: IRgb): IRgb {
  rgb2.R = rgb1.R;
  rgb2.G = rgb1.G;
  rgb2.B = rgb1.B;
  rgb2.a = rgb1.a;
  return rgb2;
}
