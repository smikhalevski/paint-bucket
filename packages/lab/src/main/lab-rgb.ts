import {labToXyz, xyzToLab} from './lab-xyz';
import {createXyz, rgbToXyz, xyzToRgb} from '@paint-bucket/xyz';
import {IRgb} from '@paint-bucket/core';
import {ILab} from './lab';

const tempXyz = createXyz();

export function rgbToLab(rgb: IRgb, lab: ILab): ILab {
  return xyzToLab(rgbToXyz(rgb, tempXyz), lab);
}

export function labToRgb(lab: ILab, rgb: IRgb): IRgb {
  return xyzToRgb(labToXyz(lab, tempXyz), rgb);
}
