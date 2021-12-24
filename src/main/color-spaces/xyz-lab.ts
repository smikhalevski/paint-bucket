import {pow} from '../math';
import {Lab, Xyz} from '../colors';

export function xyzToLab(xyz: Xyz, lab: Lab): Lab {

  const x = rotateXyz(xyz.X / Xyz.MAX_X);
  const y = rotateXyz(xyz.Y / 100);
  const z = rotateXyz(xyz.Z / Xyz.MAX_Z);

  lab.L = (116 * y) - 16;
  lab.A = 500 * (x - y);
  lab.B = 200 * (y - z);
  lab.a = xyz.a;

  return lab;
}

function rotateXyz(q: number): number {
  return q > 0.008856 ? pow(q, 1 / 3) : (7.787 * q) + 16 / 116;
}
