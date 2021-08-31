import {pow} from '../math';
import {ILabColor, IXyzColor} from '../color-types';
import {MAX_X, MAX_Z} from './xyz';

export function xyzToLab(xyz: IXyzColor, lab: ILabColor): ILabColor {

  const x = rotateXyz(xyz.X / MAX_X);
  const y = rotateXyz(xyz.Y / 100);
  const z = rotateXyz(xyz.Z / MAX_Z);

  lab.L = (116 * y) - 16;
  lab.A = 500 * (x - y);
  lab.B = 200 * (y - z);
  lab.a = xyz.a;

  return lab;
}

function rotateXyz(q: number): number {
  return q > 0.008856 ? pow(q, 1 / 3) : (7.787 * q) + 16 / 116;
}
