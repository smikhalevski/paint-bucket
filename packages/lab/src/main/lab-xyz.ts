import {ILab} from './lab';
import {IXyz} from '@paint-bucket/xyz';

const cbrt = Math.cbrt || ((x) => Math.pow(x, 1 / 3));

export function xyzToLab(xyz: IXyz, lab: ILab): ILab {
  const {X, Y, Z} = xyz;

  const x = rotateXyz(X / 0.95047);
  const y = rotateXyz(Y);
  const z = rotateXyz(Z / 1.08883);

  lab.L = (1.16 * y) - 0.16;
  lab.A = 5 * (x - y);
  lab.B = 2 * (y - z);
  lab.a = xyz.a;

  return lab;
}

function rotateXyz(v: number): number {
  return v > 0.008856 ? cbrt(v) : 7.787 * v + 16 / 116;
}

export function labToXyz(lab: ILab, xyz: IXyz): IXyz {
  const {L, A, B} = lab;
  var x = 0, y, z = 0, y2;

  if (L <= 8) {
    y = (L * 100) / 903.3;
    y2 = (7.787 * (y / 100)) + (16 / 116);
  } else {
    y = 100 * Math.pow((L + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1 / 3);
  }

  x = x / 95.047 <= 0.008856 ? (95.047 * ((A / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((A / 500) + y2, 3);

  z = z / 108.883 <= 0.008859 ? (108.883 * (y2 - (B / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (B / 200), 3);

  xyz.X = x;
  xyz.Y = y;
  xyz.Z = z;
  xyz.a = lab.a;

  return xyz;
}
