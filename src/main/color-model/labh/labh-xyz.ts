import { XYZ } from '../xyz';
import { LABh } from './labh';

const { sqrt } = Math;

/**
 * Convert XYZa to Hunter L, a, b.
 */
export function convertXYZToLABh(xyz: XYZ, labh: LABh): LABh {
  const Y = xyz[1];
  const sqrtY = sqrt(Y);

  labh[0] = 10 * sqrtY;
  labh[1] = Y === 0 ? 0 : 17.5 * ((1.02 * xyz[0] - Y) / sqrtY);
  labh[2] = Y === 0 ? 0 : 7 * ((Y - 0.847 * xyz[2]) / sqrtY);
  labh[3] = xyz[3];

  return labh;
}

/**
 * Convert Hunter L, a, b to XYZa.
 */
export function convertLABhToXYZ(labh: LABh, xyz: XYZ): XYZ {
  const L = labh[0];
  const Y = (L * L) / 100;

  xyz[0] = (((labh[1] / 17.5) * L) / 10 + Y) / 1.02;
  xyz[1] = Y;
  xyz[2] = -(((labh[2] / 7) * L) / 10 - Y) / 0.847;
  xyz[3] = labh[3];

  return xyz;
}
