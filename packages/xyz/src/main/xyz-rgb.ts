import {IRgb} from '@paint-bucket/core';
import {IXyz} from './xyz';

export function rgbToXyz(rgb: IRgb, xyz: IXyz): IXyz {

  const r = rotateRgbToXyz(rgb.R / 0xFF * 100);
  const g = rotateRgbToXyz(rgb.G / 0xFF * 100);
  const b = rotateRgbToXyz(rgb.B / 0xFF * 100);

  xyz.X = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  xyz.Y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  xyz.Z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;
  xyz.a = rgb.a;

  return xyz;
}

function rotateRgbToXyz(v: number): number {
  return v > 4.045 ? Math.pow((v + 5.5) / 105.5, 2.4) * 100 : v / 12.92;
}

export function xyzToRgb(xyz: IXyz, rgb: IRgb): IRgb {
  const {X, Y, Z} = xyz;

  const r = X *  3.2404542 + Y * -1.5371385 + Z * -0.4985314;
  const g = X * -0.9692660 + Y *  1.8760108 + Z *  0.0415560;
  const b = X *  0.0556434 + Y * -0.2040259 + Z *  1.0572252;

  rgb.R = rotateXyzToRgb(r) / 100 * 0xFF;
  rgb.G = rotateXyzToRgb(g) / 100 * 0xFF;
  rgb.B = rotateXyzToRgb(b) / 100 * 0xFF;
  rgb.a = xyz.a;

  return rgb;
}

function rotateXyzToRgb(v: number): number {
  return v > 0.31308 ? 1.055 * Math.pow(v / 100, 1 / 2.4) * 100 - 5.5 : 12.92 * v;
}
