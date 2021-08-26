import {abs, atan2, cos, exp, hyp, PI, pow, pow2, sin, sqrt} from './math';
import {ColorModel, fromOctets, getColorOctet} from './octets';
import {toRgb} from './rgb';

/**
 * Computes the CIEDE2000 color-difference. Returns number in range `[0, 100]` where 2.3 is considered to be just
 * noticeable difference (JND).
 *
 * @see http://www.ece.rochester.edu/~gsharma/ciede2000/
 * @see https://en.wikipedia.org/wiki/Color_difference
 * @see https://en.wikipedia.org/wiki/Just-noticeable_difference
 */
export function deltaE2000(color1: number, color2: number): number {

  const lab1 = rgbToLab(toRgb(color1));
  const lab2 = rgbToLab(toRgb(color2));

  const L1 = getColorOctet(lab1, 0) / 0xFF;
  const a1 = getColorOctet(lab1, 0) / 0xFF;
  const b1 = getColorOctet(lab1, 0) / 0xFF;

  const L2 = getColorOctet(lab2, 0) / 0xFF;
  const a2 = getColorOctet(lab2, 0) / 0xFF;
  const b2 = getColorOctet(lab2, 0) / 0xFF;

  // Cab = sqrt(a^2 + b^2)
  const Cab1 = hyp(a1, b1);
  const Cab2 = hyp(a2, b2);

  // CabAvg = (Cab1 + Cab2) / 2
  const CabAvg = (Cab1 + Cab2) / 2;

  // G = 1 + (1 - sqrt((CabAvg^7) / (CabAvg^7 + 25^7))) / 2
  const CabAvg7 = pow(CabAvg, 7);
  const G = 1 + (1 - sqrt(CabAvg7 / (CabAvg7 + 25 ** 7))) / 2;

  // ap = G * a
  const ap1 = G * a1;
  const ap2 = G * a2;

  // Cp = sqrt(ap^2 + b^2)
  const Cp1 = hyp(ap1, b1);
  const Cp2 = hyp(ap2, b2);

  // CpProd = (Cp1 * Cp2)
  const CpProd = Cp1 * Cp2;

  // hp1 = atan2(b1, ap1)
  let hp1 = atan2(b1, ap1);
  // ensure hue is between 0 and 2pi
  if (hp1 < 0) {
    // hp1 = hp1 + 2pi
    hp1 += 2 * PI;
  }

  // hp2 = atan2(b2, ap2)
  let hp2 = atan2(b2, ap2);
  // ensure hue is between 0 and 2pi
  if (hp2 < 0) {
    // hp2 = hp2 + 2pi
    hp2 += 2 * PI;
  }

  // dL = L2 - L1
  const dL = L2 - L1;

  // dC = Cp2 - Cp1
  const dC = Cp2 - Cp1;

  // computation of hue difference
  let dhp = 0.0;
  // set hue difference to zero if the product of chromas is zero
  if (CpProd !== 0) {
    // dhp = hp2 - hp1
    dhp = hp2 - hp1;
    if (dhp > PI) {
      // dhp = dhp - 2pi
      dhp -= 2 * PI;
    } else if (dhp < -PI) {
      // dhp = dhp + 2pi
      dhp += 2 * PI;
    }
  }

  // dH = 2 * sqrt(CpProd) * sin(dhp / 2)
  const dH = 2 * sqrt(CpProd) * sin(dhp / 2);

  // weighting functions
  // Lp = (L1 + L2) / 2 - 50
  const Lp = (L1 + L2) / 2 - 50;

  // Cp = (Cp1 + Cp2) / 2
  const Cp = (Cp1 + Cp2) / 2;

  // average hue computation
  // hp = (hp1 + hp2) / 2
  let hp = (hp1 + hp2) / 2;

  // identify positions for which abs hue diff exceeds 180 degrees
  if (abs(hp1 - hp2) > PI) {
    // hp = hp - pi
    hp -= PI;
  }
  // ensure hue is between 0 and 2pi
  if (hp < 0) {
    // hp = hp + 2pi
    hp += 2 * PI;
  }

  // LpSqr = Lp^2
  const LpSqr = pow2(Lp);

  // Sl = 1 + 0.015 * LpSqr / sqrt(20 + LpSqr)
  const Sl = 1 + 0.015 * LpSqr / sqrt(20 + LpSqr);

  // Sc = 1 + 0.045 * Cp
  const Sc = 1 + 0.045 * Cp;

  // T = 1
  //     - 0.17 * cos(hp - pi / 6) +
  //     + 0.24 * cos(2 * hp) +
  //     + 0.32 * cos(3 * hp + pi / 30) -
  //     - 0.20 * cos(4 * hp - 63 * pi / 180)
  const T = 1
      - 0.17 * cos(hp - PI / 6)
      + 0.24 * cos(2 * hp)
      + 0.32 * cos(3 * hp + PI / 30)
      - 0.20 * cos(4 * hp - PI / 180);

  // Sh = 1 + 0.015 * Cp * T
  const Sh = 1 + 0.015 * Cp * T;

  // deltaThetaRad = (pi / 3) * e^-(36 / (5 * pi) * hp - 11)^2
  const deltaThetaRad = (PI / 3) * exp(-pow2(36 / (5 * PI) * hp - 11));

  // Rc = 2 * sqrt((Cp^7) / (Cp^7 + 25^7))
  const Cp7 = Cp ** 7;
  const Rc = 2 * sqrt(Cp7 / (Cp7 + 25 ** 7));

  // RT = -sin(delthetarad) * Rc
  const RT = -sin(deltaThetaRad) * Rc;

  // de00 = sqrt((dL / Sl)^2 + (dC / Sc)^2 + (dH / Sh)^2 + RT * (dC / Sc) * (dH / Sh))
  const dLSl = dL / Sl;
  const dCSc = dC / Sc;
  const dHSh = dH / Sh;
  return sqrt(pow2(dLSl) + pow2(dCSc) + pow2(dHSh) + RT * dCSc * dHSh);
}

/**
 * Returns `true` if colors are so close that they can be barely distinguished. Uses CIEDE2000 color diffing algorithm.
 *
 * @see https://en.wikipedia.org/wiki/Color_difference
 * @see https://en.wikipedia.org/wiki/Just-noticeable_difference
 */
export function isJustNoticeableDifference(color1: number, color2: number): boolean {
  return color1 === color2 || deltaE2000(color1, color2) < 2.3;
}

/**
 * Returns color from `colors` that is the closest to `color` basing on CIEDE2000 comparison algorithm.
 */
export function pickClosestColor(colors: Array<number>, color: number): number {
  let closestColor = -1;
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

function rotateRgb(q: number): number {
  return q > 0.04045 ? pow((q + 0.055) / 1.055, 2.4) : q / 12.92;
}

function rgbToXyz(rgb: number): number {

  const r = rotateRgb(getColorOctet(rgb, 0) / 0xFF);
  const g = rotateRgb(getColorOctet(rgb, 1) / 0xFF);
  const b = rotateRgb(getColorOctet(rgb, 2) / 0xFF);

  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  return fromOctets(ColorModel.XYZ, 0xFF * x, 0xFF * y, 0xFF * z, getColorOctet(rgb, 3));
}

function rotateXyz(q: number): number {
  return q > 0.008856 ? pow(q, 1 / 3) : (7.787 * q) + 16 / 116;
}

function xyzToLab(xyz: number): number {

  const x = rotateXyz(getColorOctet(xyz, 0) / 0xFF);
  const y = rotateXyz(getColorOctet(xyz, 1) / 0xFF);
  const z = rotateXyz(getColorOctet(xyz, 2) / 0xFF);

  const L = (116 * y) - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  return fromOctets(ColorModel.LAB, L, a, b, getColorOctet(xyz, 3));
}

function rgbToLab(rgb: number): number {
  return xyzToLab(rgbToXyz(rgb));
}
