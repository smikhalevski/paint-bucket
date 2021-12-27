import {IRgb} from '@paint-bucket/core';
import {IXyz} from './xyz';
import {clamp01} from 'numeric-wrench';

/**
 * Whitepoint reference values with observer/illuminant
 *
 * @see http://en.wikipedia.org/wiki/Standard_illuminant
 * @see https://github.com/colorjs/color-space/blob/master/xyz.js
 */
export const xyzWhitepoint = {
  //1931 2°
  2: {
    //incadescent
    A: [1.0985, 1, 0.35585],
    // B:[],
    C: [0.98074, 1, 1.18232],
    D50: [0.96422, 1, 0.82521],
    D55: [0.95682, 1, 0.92149],
    //daylight
    D65: [0.95045592705167, 1, 1.089057750759878],
    D75: [0.94972, 1, 1.22638],
    //flourescent
    // F1: [],
    F2: [0.99187, 1, 0.67395],
    // F3: [],
    // F4: [],
    // F5: [],
    // F6:[],
    F7: [0.95044, 1, 0.108755],
    // F8: [],
    // F9: [],
    // F10: [],
    F11: [1.00966, 1, 0.64370],
    // F12: [],
    E: [1, 1, 1],
  },

  //1964  10°
  10: {
    //incadescent
    A: [1.11144, 1, 0.35200],
    C: [0.97285, 1, 1.16145],
    D50: [0.96720, 1, 0.81427],
    D55: [0.95799, 1, 0.90926],
    //daylight
    D65: [0.94811, 1, 1.07304],
    D75: [0.94416, 1, 1.20641],
    //flourescent
    F2: [1.03280, 1, 0.69026],
    F7: [0.95792, 1, 1.07687],
    F11: [1.03866, 1, 0.65627],
    E: [1, 1, 1],
  },
} as const;

export function rgbToXyz(rgb: IRgb, xyz: IXyz, whitepoint = xyzWhitepoint[2].E): IXyz {

  const r = rotateRgbToXyz(rgb.R) / whitepoint[0];
  const g = rotateRgbToXyz(rgb.G) / whitepoint[1];
  const b = rotateRgbToXyz(rgb.B) / whitepoint[2];

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
 * @se http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */
export function xyzToRgb(xyz: IXyz, rgb: IRgb, whitepoint = xyzWhitepoint[2].E): IRgb {
  const {X, Y, Z} = xyz;

  const r = X * +3.240969941904521 + Y * -1.537383177570093 + Z * -0.498610760293000;
  const g = X * -0.969243636280870 + Y * +1.875967501507720 + Z * +0.041555057407175;
  const b = X * +0.055630079696993 + Y * -0.203976958888970 + Z * +1.056971514242878;

  rgb.R = clamp01(rotateXyzToRgb(r)) * whitepoint[0];
  rgb.G = clamp01(rotateXyzToRgb(g)) * whitepoint[1];
  rgb.B = clamp01(rotateXyzToRgb(b)) * whitepoint[2];
  rgb.a = xyz.a;

  return rgb;
}

function rotateXyzToRgb(v: number): number {
  return v > 0.0031308 ? (1.055 * Math.pow(v, 1.0 / 2.4)) - 0.055 : v * 12.92;
}
