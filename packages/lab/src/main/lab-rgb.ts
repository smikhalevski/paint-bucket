import {labToXyz, xyzToLab} from './lab-xyz';
import {createXyz, rgbToXyz, whitepoint, xyzToRgb} from '@paint-bucket/xyz';
import {Rgb} from '@paint-bucket/core';
import {ILab} from './lab';

const tempXyz = createXyz();

export function rgbToLab(rgb: Rgb, lab: ILab, white = whitepoint[2].D65): ILab {
  return xyzToLab(rgbToXyz(rgb, tempXyz, white), lab, white);
}

export function labToRgb(lab: ILab, rgb: Rgb, white = whitepoint[2].D65): Rgb {
  return xyzToRgb(labToXyz(lab, tempXyz, white), rgb, white);
}
