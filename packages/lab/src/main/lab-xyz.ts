import {ILab} from './lab';
import {IXyz} from '@paint-bucket/xyz';

const epsilon = Math.pow(6, 3) / Math.pow(29, 3);
const kappa = Math.pow(29, 3) / Math.pow(3, 3);

const wd50X = 96.42;
const wd50Y = 100;
const wd50Z = 82.49;

export function xyzToLab(xyz: IXyz, lab: ILab): ILab {
  const {X, Y, Z} = xyz;

  // calculate D50 XYZ from D65 XYZ
  const d50X = X *  1.0478112 + Y * 0.0228866 + Z * -0.0501270;
  const d50Y = X *  0.0295424 + Y * 0.9904844 + Z * -0.0170491;
  const d50Z = X * -0.0092345 + Y * 0.0150436 + Z *  0.7521316;

  const f1 = rotateXyz(d50X / wd50X);
  const f2 = rotateXyz(d50Y / wd50Y);
  const f3 = rotateXyz(d50Z / wd50Z);

  lab.L = 116 * f2 - 16;
  lab.A = 500 * (f1 - f2);
  lab.B = 200 * (f2 - f3);
  lab.a = xyz.a;

  return lab;
}

function rotateXyz(value: number): number {
  return value > epsilon ? Math.cbrt(value) : (kappa * value + 16) / 116;
}

export function labToXyz(lab: ILab, xyz: IXyz): IXyz {

  // compute f, starting with the luminance-related term
  const f2 = (lab.L + 16) / 116;
  const f1 = lab.A / 500 + f2;
  const f3 = f2 - lab.B / 200;

  // compute pre-scaled XYZ
  let initX = Math.pow(f1, 3) > epsilon ? Math.pow(f1, 3) : (116 * f1 - 16) / kappa;
  let initY = lab.L > kappa * epsilon ? Math.pow((lab.L + 16) / 116, 3) : lab.L / kappa;
  let initZ = Math.pow(f3, 3) > epsilon ? Math.pow(f3, 3) : (116 * f3 - 16) / kappa;

  // compute XYZ by scaling pre-scaled XYZ by reference white
  initX *= wd50X;
  initY *= wd50Y;
  initZ *= wd50Z;

  // calculate D65 XYZ from D50 XYZ
  xyz.X = initX *  0.9555766 + initY * -0.0230393 + initZ * 0.0631636;
  xyz.Y = initX * -0.0282895 + initY *  1.0099416 + initZ * 0.0210077;
  xyz.Z = initX *  0.0122982 + initY * -0.0204830 + initZ * 1.3299098;
  xyz.a = lab.a;

  return xyz;
}
