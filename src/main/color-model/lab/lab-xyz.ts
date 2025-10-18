import { clamp } from '../../utils.js';
import { WhitePoint, XYZ } from '../xyz/index.js';
import { LAB } from './lab.js';

function pow3(x: number): number {
  return x * x * x;
}

const { pow, cbrt = x => pow(x, 1 / 3) } = Math;

const EPSILON = 6 ** 3 / 29 ** 3;
const KAPPA = 7.787;

/**
 * Convert XYZa to CIELAB.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/#color-conversion-code CSS Color Module Level 4}
 * @see {@link https://www.easyrgb.com/en/math.php Color math and programming code examples}
 */
export function convertXYZToLAB(xyz: XYZ, lab: LAB, whitePoint = WhitePoint.CIE1964.D65): LAB {
  const [X, Y, Z] = xyz;

  const fX = rotateXYZ(X / whitePoint[0]);
  const fY = rotateXYZ(Y / whitePoint[1]);
  const fZ = rotateXYZ(Z / whitePoint[2]);

  lab[0] = clamp(1.16 * fY - 0.16);
  lab[1] = clamp((5 * (fX - fY) + 1) / 2);
  lab[2] = clamp((2 * (fY - fZ) + 1) / 2);
  lab[3] = xyz[3];

  return lab;
}

function rotateXYZ(v: number): number {
  return v > EPSILON ? cbrt(v) : KAPPA * v + 16 / 116;
}

/**
 * Convert CIELAB to XYZa.
 */
export function convertLABToXYZ(lab: LAB, xyz: XYZ, whitePoint = WhitePoint.CIE1964.D65): XYZ {
  const [L, A, B] = lab;

  // Compute f, starting with the luminance-related term
  const fX = (L + 0.16) / 1.16;
  const fY = (A * 2 - 1) / 5 + fX;
  const fZ = fX - (B * 2 - 1) / 2;

  const pow3Fy = fY * fY * fY;
  const pow3Fz = fZ * fZ * fZ;

  const X = pow3Fy > EPSILON ? pow3Fy : (1.16 * fY - 0.16) / KAPPA;
  const Y = L > EPSILON * KAPPA ? pow3((L + 0.16) / 1.16) : L / KAPPA;
  const Z = pow3Fz > EPSILON ? pow3Fz : (1.16 * fZ - 0.16) / KAPPA;

  xyz[0] = clamp(X * whitePoint[0]);
  xyz[1] = clamp(Y * whitePoint[1]);
  xyz[2] = clamp(Z * whitePoint[2]);
  xyz[3] = lab[3];

  return xyz;
}
