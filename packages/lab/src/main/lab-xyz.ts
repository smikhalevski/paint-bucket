import {Lab} from './lab';
import {whitepoint, Xyz} from '@paint-bucket/xyz';
import {clamp1} from 'algomatic';

function pow3(x: number): number {
  return x * x * x;
}

const cbrt = Math.cbrt || ((x) => Math.pow(x, 1 / 3));

const enum Const {
  EPSILON = 6 ** 3 / 29 ** 3,
  KAPPA = 7.787,
}

/**
 * Convert XYZa to CIELAB.
 *
 * @see https://www.w3.org/TR/css-color-4/#rgb-to-lab
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @see https://www.easyrgb.com/en/math.php
 */
export function xyzToLab(xyz: Xyz, lab: Lab, white = whitepoint[10].D65): Lab {
  const [X, Y, Z] = xyz;

  const fX = rotateXyz(X / white[0]);
  const fY = rotateXyz(Y / white[1]);
  const fZ = rotateXyz(Z / white[2]);

  lab[0] = clamp1((1.16 * fY) - 0.16);
  lab[1] = clamp1((5 * (fX - fY) + 1) / 2);
  lab[2] = clamp1((2 * (fY - fZ) + 1) / 2);
  lab[3] = xyz[3];

  return lab;
}

function rotateXyz(v: number): number {
  return v > Const.EPSILON ? cbrt(v) : Const.KAPPA * v + 16 / 116;
}

/**
 * Convert CIELAB to XYZa.
 */
export function labToXyz(lab: Lab, xyz: Xyz, white = whitepoint[10].D65): Xyz {
  const [L, A, B] = lab;

  // Compute f, starting with the luminance-related term
  const fX = (L + 0.16) / 1.16;
  const fY = (A * 2 - 1) / 5 + fX;
  const fZ = fX - (B * 2 - 1) / 2;

  const pow3Fy = fY * fY * fY;
  const pow3Fz = fZ * fZ * fZ;

  const X = pow3Fy > Const.EPSILON ? pow3Fy : (1.16 * fY - 0.16) / Const.KAPPA;
  const Y = L > Const.EPSILON * Const.KAPPA ? pow3((L + 0.16) / 1.16) : L / Const.KAPPA;
  const Z = pow3Fz > Const.EPSILON ? pow3Fz : (1.16 * fZ - 0.16) / Const.KAPPA;

  xyz[0] = clamp1(X * white[0]);
  xyz[1] = clamp1(Y * white[1]);
  xyz[2] = clamp1(Z * white[2]);
  xyz[3] = lab[3];

  return xyz;
}
