import { labToXyz, xyzToLab } from './lab-xyz';
import { rgbToXyz, WhitePoint, Xyz, xyzToRgb } from '@paint-bucket/xyz';
import { Rgb } from '@paint-bucket/core';
import { Lab } from './lab';

const tempXyz: Xyz = [0, 0, 0, 1];

export function rgbToLab(rgb: Rgb, lab: Lab, whitePoint = WhitePoint.deg2.D65): Lab {
  return xyzToLab(rgbToXyz(rgb, tempXyz, whitePoint), lab, whitePoint);
}

export function labToRgb(lab: Lab, rgb: Rgb, whitePoint = WhitePoint.deg2.D65): Rgb {
  return xyzToRgb(labToXyz(lab, tempXyz, whitePoint), rgb, whitePoint);
}
