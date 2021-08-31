import {abs, atan2, cos, exp, PI, pow, sin, sqrt} from './math';
import {toColorSpace} from './colors';
import {Color, ColorSpace} from './color-types';

/**
 * Computes the CIEDE2000 color-difference.
 *
 * Returns number in range [0, 100] where 2.3 is considered to be just
 * noticeable difference (JND).
 *
 * - [0, 1)    Not perceptible by human eyes.
 * - [1, 2)    Perceptible through close observation.
 * - [2, 10)   Perceptible at a glance.
 * - [10, 50)  Colors are more similar than opposite.
 * - [50, 100] Colors are exact opposite.
 *
 * @see http://zschuessler.github.io/DeltaE/learn
 * @see http://www.ece.rochester.edu/~gsharma/ciede2000/
 * @see https://en.wikipedia.org/wiki/Color_difference
 * @see https://en.wikipedia.org/wiki/Just-noticeable_difference
 */
export function deltaE2000(c1: Color, c2: Color): number {

  const {L: L1, A: a1, B: b1} = toColorSpace(c1, ColorSpace.LAB);
  const {L: L2, A: a2, B: b2} = toColorSpace(c2, ColorSpace.LAB);

  // Weight factors
  var kL = 1;
  var kC = 1;
  var kH = 1;

  /**
   * Step 1: Calculate C1p, C2p, h1p, h2p
   */
  var C1 = sqrt(pow(a1, 2) + pow(b1, 2)); //(2)
  var C2 = sqrt(pow(a2, 2) + pow(b2, 2)); //(2)

  var a_C1_C2 = (C1 + C2) / 2.0;             //(3)

  var G = 0.5 * (1 - sqrt(pow(a_C1_C2, 7.0) /
      (pow(a_C1_C2, 7.0) + pow(25.0, 7.0)))); //(4)

  var a1p = (1.0 + G) * a1; //(5)
  var a2p = (1.0 + G) * a2; //(5)

  var C1p = sqrt(pow(a1p, 2) + pow(b1, 2)); //(6)
  var C2p = sqrt(pow(a2p, 2) + pow(b2, 2)); //(6)

  var h1p = hp_f(b1, a1p); //(7)
  var h2p = hp_f(b2, a2p); //(7)

  /**
   * Step 2: Calculate dLp, dCp, dHp
   */
  var dLp = L2 - L1; //(8)
  var dCp = C2p - C1p; //(9)

  var dhp = dhp_f(C1, C2, h1p, h2p); //(10)
  var dHp = 2 * sqrt(C1p * C2p) * sin(radians(dhp) / 2.0); //(11)

  /**
   * Step 3: Calculate CIEDE2000 Color-Difference
   */
  var a_L = (L1 + L2) / 2.0; //(12)
  var a_Cp = (C1p + C2p) / 2.0; //(13)

  var a_hp = a_hp_f(C1, C2, h1p, h2p); //(14)
  var T = 1 - 0.17 * cos(radians(a_hp - 30)) + 0.24 * cos(radians(2 * a_hp)) +
      0.32 * cos(radians(3 * a_hp + 6)) - 0.20 * cos(radians(4 * a_hp - 63)); //(15)
  var d_ro = 30 * exp(-(pow((a_hp - 275) / 25, 2))); //(16)
  var RC = sqrt((pow(a_Cp, 7.0)) / (pow(a_Cp, 7.0) + pow(25.0, 7.0)));//(17)
  var SL = 1 + ((0.015 * pow(a_L - 50, 2)) /
      sqrt(20 + pow(a_L - 50, 2.0)));//(18)
  var SC = 1 + 0.045 * a_Cp;//(19)
  var SH = 1 + 0.015 * a_Cp * T;//(20)
  var RT = -2 * RC * sin(radians(2 * d_ro));//(21)
  var dE = sqrt(pow(dLp / (SL * kL), 2) + pow(dCp / (SC * kC), 2) +
      pow(dHp / (SH * kH), 2) + RT * (dCp / (SC * kC)) *
      (dHp / (SH * kH))); //(22)
  return dE;
}

/**
 * INTERNAL FUNCTIONS
 */
function degrees(n: number) {
  return n * (180 / PI);
}

function radians(n: number) {
  return n * (PI / 180);
}

function hp_f(x: number, y: number) //(7)
{
  if (x === 0 && y === 0) return 0;
  else {
    var tmphp = degrees(atan2(x, y));
    if (tmphp >= 0) return tmphp;
    else return tmphp + 360;
  }
}

function dhp_f(C1: number, C2: number, h1p: number, h2p: number) //(10)
{
  if (C1 * C2 === 0) return 0;
  else if (abs(h2p - h1p) <= 180) return h2p - h1p;
  else if ((h2p - h1p) > 180) return (h2p - h1p) - 360;
  else if ((h2p - h1p) < -180) return (h2p - h1p) + 360;
  else throw(new Error());
}

function a_hp_f(C1: number, C2: number, h1p: number, h2p: number) { //(14)
  if (C1 * C2 === 0) return h1p + h2p;
  else if (abs(h1p - h2p) <= 180) return (h1p + h2p) / 2.0;
  else if ((abs(h1p - h2p) > 180) && ((h1p + h2p) < 360)) return (h1p + h2p + 360) / 2.0;
  else if ((abs(h1p - h2p) > 180) && ((h1p + h2p) >= 360)) return (h1p + h2p - 360) / 2.0;
  else throw(new Error());
}

/**
 * Returns `true` if colors are so close that they can be barely distinguished. Uses CIEDE2000 color diffing algorithm.
 *
 * @see https://en.wikipedia.org/wiki/Color_difference
 * @see https://en.wikipedia.org/wiki/Just-noticeable_difference
 */
export function isJustNoticeableDifference(color1: Color, color2: Color): boolean {
  return color1 === color2 || deltaE2000(color1, color2) < 2.3;
}

/**
 * Returns color from `colors` that is the closest to `color` basing on CIEDE2000 comparison algorithm.
 */
export function pickClosestColor(colors: Array<Color>, color: Color): Color | undefined {
  let closestColor;
  let deJ = Infinity;

  for (const otherColor of colors) {
    const deI = deltaE2000(otherColor, color);

    if (deI < deJ) {
      closestColor = otherColor;
      deJ = deI;
    }
  }
  return closestColor;
}
