import { Lab } from './lab';
import { WhitePoint, Xyz } from '@paint-bucket/xyz';
import { clamp1 } from 'algomatic';

function pow3(x: number): number {
  return x * x * x;
}

const cbrt = Math.cbrt || (x => Math.pow(x, 1 / 3));

const enum Coefficient {
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
export function xyzToLab(xyz: Xyz, lab: Lab, whitePoint = WhitePoint.deg10.D65): Lab {
  const [X, Y, Z] = xyz;

  const fX = rotateXyz(X / whitePoint[0]);
  const fY = rotateXyz(Y / whitePoint[1]);
  const fZ = rotateXyz(Z / whitePoint[2]);

  lab[0] = clamp1(1.16 * fY - 0.16);
  lab[1] = clamp1((5 * (fX - fY) + 1) / 2);
  lab[2] = clamp1((2 * (fY - fZ) + 1) / 2);
  lab[3] = xyz[3];

  return lab;
}

function rotateXyz(v: number): number {
  return v > Coefficient.EPSILON ? cbrt(v) : Coefficient.KAPPA * v + 16 / 116;
}

/**
 * Convert CIELAB to XYZa.
 */
export function labToXyz(lab: Lab, xyz: Xyz, whitePoint = WhitePoint.deg10.D65): Xyz {
  const [L, A, B] = lab;

  // Compute f, starting with the luminance-related term
  const fX = (L + 0.16) / 1.16;
  const fY = (A * 2 - 1) / 5 + fX;
  const fZ = fX - (B * 2 - 1) / 2;

  const pow3Fy = fY * fY * fY;
  const pow3Fz = fZ * fZ * fZ;

  const X = pow3Fy > Coefficient.EPSILON ? pow3Fy : (1.16 * fY - 0.16) / Coefficient.KAPPA;
  const Y = L > Coefficient.EPSILON * Coefficient.KAPPA ? pow3((L + 0.16) / 1.16) : L / Coefficient.KAPPA;
  const Z = pow3Fz > Coefficient.EPSILON ? pow3Fz : (1.16 * fZ - 0.16) / Coefficient.KAPPA;

  xyz[0] = clamp1(X * whitePoint[0]);
  xyz[1] = clamp1(Y * whitePoint[1]);
  xyz[2] = clamp1(Z * whitePoint[2]);
  xyz[3] = lab[3];

  return xyz;
}
