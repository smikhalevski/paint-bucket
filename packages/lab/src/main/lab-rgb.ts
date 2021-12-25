import {xyzToLab} from './lab-xyz';
import {createXyz, rgbToXyz} from '@paint-bucket/xyz';
import {IRgb} from '@paint-bucket/core';
import {ILab} from './lab';

const tempXyz = createXyz();

export function rgbToLab(rgb: IRgb, lab: ILab): ILab {
  return xyzToLab(rgbToXyz(rgb, tempXyz), lab);
}
