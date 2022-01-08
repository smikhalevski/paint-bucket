import {labToXyz, xyzToLab} from './lab-xyz';
import {rgbToXyz, whitepoint, Xyz, xyzToRgb} from '@paint-bucket/xyz';
import {Rgb} from '@paint-bucket/core';
import {Lab} from './lab';

const tempXyz: Xyz = [0, 0, 0, 1];

export function rgbToLab(rgb: Rgb, lab: Lab, white = whitepoint[2].D65): Lab {
  return xyzToLab(rgbToXyz(rgb, tempXyz, white), lab, white);
}

export function labToRgb(lab: Lab, rgb: Rgb, white = whitepoint[2].D65): Rgb {
  return xyzToRgb(labToXyz(lab, tempXyz, white), rgb, white);
}
