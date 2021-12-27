import {IRgb} from '@paint-bucket/core';
import {IXyz} from './xyz';
import {clamp01} from 'numeric-wrench';
import {whitepoint} from './whitepoint';

/**
 * Convert RGBa to XYZa.
 */
export function rgbToXyz(rgb: IRgb, xyz: IXyz, white = whitepoint[2].D65): IXyz {

  const r = rotateRgbToXyz(rgb.R) / white[0];
  const g = rotateRgbToXyz(rgb.G) / white[1];
  const b = rotateRgbToXyz(rgb.B) / white[2];

  xyz.X = clamp01(r * 0.412390799265950 + g * 0.35758433938387 + b * 0.180480788401830);
  xyz.Y = clamp01(r * 0.212639005871510 + g * 0.71516867876775 + b * 0.072192315360733);
  xyz.Z = clamp01(r * 0.019330818715591 + g * 0.11919477979462 + b * 0.950532152249660);
  xyz.a = rgb.a;

  return xyz;
}

/**
 * Undoes gamma-correction from an RGB-encoded color.
 *
 * @see https://en.wikipedia.org/wiki/SRGB#Specification_of_the_transformation
 * @see https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
 */
function rotateRgbToXyz(v: number): number {
  return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 0.1292;
}

/**
 * Convert XYZa to RGBa.
 *
 * @see https://www.w3.org/TR/css-color-4/#rgb-to-lab
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export function xyzToRgb(xyz: IXyz, rgb: IRgb, white = whitepoint[2].D65): IRgb {
  const {X, Y, Z} = xyz;

  const r = X * +3.240969941904521 + Y * -1.537383177570093 + Z * -0.498610760293000;
  const g = X * -0.969243636280870 + Y * +1.875967501507720 + Z * +0.041555057407175;
  const b = X * +0.055630079696993 + Y * -0.203976958888970 + Z * +1.056971514242878;

  rgb.R = clamp01(rotateXyzToRgb(r) * white[0]);
  rgb.G = clamp01(rotateXyzToRgb(g) * white[1]);
  rgb.B = clamp01(rotateXyzToRgb(b) * white[2]);
  rgb.a = xyz.a;

  return rgb;
}

function rotateXyzToRgb(v: number): number {
  return v > 0.0031308 ? 1.055 * Math.pow(v, 1.0 / 2.4) - 0.055 : v * 12.92;
}
