import {ILab} from '@paint-bucket/lab';
import {clamp, deg, pow2, rad} from 'numeric-wrench';

const {abs, atan2, cos, exp, sin, sqrt} = Math;

const hypot = Math.hypot || ((x, y) => sqrt(x * x + y + y));

/**
 * Computes the CIEDE2000 color-difference.
 *
 * Returns number in range [0, 100] where 2.3 is considered to be just noticeable difference (JND).
 *
 * - [0, 1)    Not perceptible by human eyes.
 * - [1, 2)    Perceptible through close observation.
 * - [2, 10)   Perceptible at a glance.
 * - [10, 50)  Colors are more similar than opposite.
 * - [50, 100] Colors are exact opposite.
 *
 * Alpha channel is ignored.
 *
 * @see http://zschuessler.github.io/DeltaE/learn
 * @see http://www.ece.rochester.edu/~gsharma/ciede2000/
 * @see https://en.wikipedia.org/wiki/Color_difference
 * @see https://en.wikipedia.org/wiki/Just-noticeable_difference
 */
export function deltaE2000(lab1: ILab, lab2: ILab): number {

  let {L: L1, A: A1, B: B1} = lab1;
  let {L: L2, A: A2, B: B2} = lab2;

  L1 *= 255;
  A1 *= 127;
  B1 *= 127;

  L2 *= 255;
  A2 *= 127;
  B2 *= 127;

  const Cab1 = hypot(A1, B1); // (2)
  const Cab2 = hypot(A2, B2); // (2)

  const CabAvg7 = ((Cab1 + Cab2) / 2) ** 7; // (3)
  const G = 0.5 - sqrt(CabAvg7 / (CabAvg7 + 25 ** 7)) / 2; // (4)

  const ap1 = (1 + G) * A1; // (5)
  const ap2 = (1 + G) * A2; // (5)

  const Cp1 = hypot(ap1, B1); // (6)
  const Cp2 = hypot(ap2, B2); // (6)

  const Hp1 = calcHp(B1, ap1); // (7)
  const Hp2 = calcHp(B2, ap2); // (7)

  const dL = L2 - L1; // (8)
  const dCp = Cp2 - Cp1; // (9)
  const dHp = 2 * sqrt(Cp1 * Cp2) * sin(rad(calcDHp(Cab1, Cab2, Hp1, Hp2)) / 2); // (11)

  const aL = (L1 + L2) / 2; // (12)
  const aCp = (Cp1 + Cp2) / 2; // (13)

  const aHp = calcAHp(Cab1, Cab2, Hp1, Hp2); // (14)

  const T = 1
      - 0.17 * cos(rad(aHp - 30))
      + 0.24 * cos(rad(2 * aHp))
      + 0.32 * cos(rad(3 * aHp + 6))
      - 0.20 * cos(rad(4 * aHp - 63)); // (15)

  const dro = 30 * exp(-pow2((aHp - 275) / 25)); // (16)

  const aCp7 = aCp ** 7;

  const rC = sqrt(aCp7 / (aCp7 + 25 ** 7)); // (17)

  const aL2 = pow2(aL - 50);
  const sL = 1 + 0.015 * aL2 / sqrt(20 + aL2); // (18)

  const sC = 1 + 0.045 * aCp; // (19)
  const sH = 1 + 0.015 * aCp * T; // (20)

  const rT = -2 * rC * sin(rad(2 * dro)); // (21)

  const dCpSc = dCp / sC;
  const dHpSh = dHp / sH;

  return clamp(sqrt(pow2(dL / sL) + pow2(dCpSc) + pow2(dHpSh) + rT * dCpSc * dHpSh), 0, 100); // (22)
}

// (7)
function calcHp(b: number, ap: number): number {
  if (b === 0 && ap === 0) {
    return 0;
  }
  const hp = deg(atan2(b, ap));

  if (hp >= 0) {
    return hp;
  }
  return hp + 360;
}

// (10)
function calcDHp(Cab1: number, Cab2: number, Hp1: number, Hp2: number): number {
  if (Cab1 * Cab2 === 0) {
    return 0;
  }
  const dHp = Hp2 - Hp1;

  if (abs(dHp) <= 180) {
    return dHp;
  }
  if (dHp > 180) {
    return dHp - 360;
  }
  if (dHp < -180) {
    return dHp + 360;
  }
  throw new Error();
}

// (14)
function calcAHp(Cab1: number, Cab2: number, Hp1: number, Hp2: number): number {
  if (Cab1 * Cab2 === 0) {
    return Hp1 + Hp2;
  }

  const dHp = Hp1 - Hp2;
  const lHp = Hp1 + Hp2;

  if (abs(dHp) <= 180) {
    return lHp / 2;
  }
  if (abs(dHp) > 180 && lHp < 360) {
    return (lHp + 360) / 2;
  }
  if (abs(dHp) > 180 && lHp >= 360) {
    return (lHp - 360) / 2;
  }
  throw new Error();
}
