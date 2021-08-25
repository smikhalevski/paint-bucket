import {ColorLike, IHsl, IRgb} from './color-types';
import {abs, atan2, cos, exp, max, min, PI, pow, round, sin, sqrt} from './math-utils';
import {hyp, pow2} from './algebra-utils';

// Internal color representation
interface ILab {
  L: number; // [0, 1]
  a: number; // [0, 1]
  b: number; // [0, 1]
  alpha: number; // [0, 1]
}

// Internal color representation
interface IXyz {
  x: number; // [0, 1]
  y: number; // [0, 1]
  z: number; // [0, 1]
  alpha: number; // [0, 1]
}

const tempXyz = {
  x: 0,
  y: 0,
  z: 0,
  alpha: 1,
};

const tempLab = {
  L: 0,
  a: 0,
  b: 0,
  alpha: 1,
};

export const tempRgb = rgb(0, 0, 0);

export const tempHsl = hsl(0, 0, 0);

function rotateRgb(q: number): number {
  return q > 0.04045 ? pow((q + 0.055) / 1.055, 2.4) : q / 12.92;
}

function rgbToXyz(rgb: IRgb, xyz: IXyz = tempXyz): IXyz {
  let {r, g, b} = rgb;

  r = rotateRgb(r / 255);
  g = rotateRgb(g / 255);
  b = rotateRgb(b / 255);

  xyz.x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  xyz.y = (r * 0.2126 + g * 0.7152 + b * 0.0722);
  xyz.z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  xyz.alpha = rgb.alpha;

  return xyz;
}

function rotateXyz(q: number): number {
  return q > 0.008856 ? pow(q, 1 / 3) : (7.787 * q) + 16 / 116;
}

function xyzToLab(xyz: IXyz, lab: ILab = tempLab): ILab {
  let {x, y, z} = xyz;

  x = rotateXyz(x);
  y = rotateXyz(y);
  z = rotateXyz(z);

  lab.L = (116 * y) - 16;
  lab.a = 500 * (x - y);
  lab.b = 200 * (y - z);
  lab.alpha = xyz.alpha;

  return lab;
}

function rgbToLab(rgb: IRgb): ILab {
  return xyzToLab(rgbToXyz(rgb));
}

export function rgb(r: number, g: number, b: number, alpha = 1): IRgb {
  return {r, g, b, alpha};
}

export function hsl(h: number, s: number, l: number, alpha = 1): IHsl {
  return {h, s, l, alpha};
}

export function rgbToHex(rgb: IRgb): string {
  const {r, g, b} = rgb;
  const bits = (
      (1 << 24) +
      (r << 16) +
      (g << 8) +
      b
  );
  return bits.toString(16).substr(1, 6);
}

export function rgbToShortHex(rgb: IRgb): string {
  const {r, g, b} = rgb;
  const r1 = r >> 4;
  const g1 = g >> 4;
  const b1 = b >> 4;

  if (
      (r1 << 4 | r1) === r &&
      (g1 << 4 | g1) === g &&
      (b1 << 4 | b1) === b
  ) {
    const bits = (
        (1 << 12) +
        (r1 << 8) +
        (g1 << 4) +
        b1
    );
    return bits.toString(16).substr(1, 3);
  }

  return rgbToHex(rgb);
}

/**
 * Converts hex color like `#fff` or `00ff00ff` to RGB. Leading "#" is ignored.
 */
export function hexToRgb(hex: string | number, outRgb = rgb(0, 0, 0)): IRgb {
  let n;

  if (typeof hex === 'string') {
    if (hex.charAt(0) === '#') {
      hex = hex.substr(1);
    }

    n = hex.length;
    hex = parseInt(hex, 16);
  } else {

    if (hex <= 0xff) {
      outRgb.r = hex;
      outRgb.g = hex;
      outRgb.b = hex;
      outRgb.alpha = hex / 255;

      return outRgb;
    }

    n = hex > 0xffffff ? 8 : 6;
  }

  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;

  if (n === 6) {
    n = 8;
    hex <<= 8;
    hex |= 0xff;
  }
  if (n === 8) {
    r = (hex >> 24) & 0xff;
    g = (hex >> 16) & 0xff;
    b = (hex >> 8) & 0xff;
    a = (hex >> 0) & 0xff;
  }
  if (n === 3) {
    n = 4;
    hex <<= 4;
    hex |= 0xf;
  }
  if (n === 4) {
    r = (hex >> 12) & 0xf;
    g = (hex >> 8) & 0xf;
    b = (hex >> 4) & 0xf;
    a = (hex >> 0) & 0xf;
    r += r << 4;
    g += g << 4;
    b += b << 4;
    a += a << 4;
  }

  outRgb.r = r;
  outRgb.g = g;
  outRgb.b = b;
  outRgb.alpha = a / 255;

  return outRgb;
}

export function rgbToHsl(rgb: IRgb, outHsl = hsl(0, 0, 0)): IHsl {
  let {r, g, b, alpha} = rgb;

  r /= 255;
  g /= 255;
  b /= 255;

  const A = max(r, g, b);
  const B = min(r, g, b);
  const l = (A + B) / 2;

  let h = 0;
  let s = 0;

  if (A !== B) {
    const d = A - B;
    s = l > 0.5 ? d / (2 - A - B) : d / (A + B);

    switch (A) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  outHsl.h = h;
  outHsl.s = s;
  outHsl.l = l;
  outHsl.alpha = alpha;

  return outHsl;
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

export function hslToRgb(hsl: IHsl, outRgb = rgb(0, 0, 0)): IRgb {
  const {h, s, l, alpha} = hsl;

  let r = l;
  let g = l;
  let b = l;

  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  outRgb.r = round(r * 255);
  outRgb.g = round(g * 255);
  outRgb.b = round(b * 255);
  outRgb.alpha = alpha;

  return outRgb;
}

export function hslToHex(hsl: IHsl): string {
  return rgbToHex(hslToRgb(hsl, tempRgb));
}

export function hexToHsl(hex: number | string, outHsl = hsl(0, 0, 0)): IHsl {
  return rgbToHsl(hexToRgb(hex, tempRgb), outHsl);
}

export function hslToCss(hsl: IHsl): string {
  return rgbToCss(hslToRgb(hsl, tempRgb));
}

export function rgbToCss(rgb: IRgb): string {
  const {r, g, b, alpha} = rgb;
  return alpha < 1 ? `rgba(${r | 0},${g | 0},${b | 0},${alpha.toPrecision(2)})` : `#${rgbToHex(rgb)}`;
}

export function cssToRgb(color: string, outRgb = rgb(0, 0, 0)): IRgb {
  const match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/);

  if (!match) {
    return hexToRgb(color, outRgb);
  }

  const [, r, g, b, alpha = '1'] = match;

  outRgb.r = parseInt(r, 10);
  outRgb.g = parseInt(g, 10);
  outRgb.b = parseInt(b, 10);
  outRgb.alpha = parseFloat(alpha);

  return outRgb;
}

export function isRgb(color: ColorLike): color is IRgb {
  return typeof color === 'object' && 'r' in color;
}

export function isHsl(color: ColorLike): color is IHsl {
  return typeof color === 'object' && 'h' in color;
}

export function toRgb(color: ColorLike, outRgb = rgb(0, 0, 0)): IRgb {
  return isRgb(color) ? color : isHsl(color) ? hslToRgb(color, outRgb) : hexToRgb(color, outRgb);
}

export function toHsl(color: ColorLike, outHsl = hsl(0, 0, 0)): IHsl {
  return isRgb(color) ? rgbToHsl(color, outHsl) : isHsl(color) ? color : hexToHsl(color, outHsl);
}

/**
 * Computes the CIEDE2000 color-difference. Returns number in range `[0, 100]` where 2.3 is considered to be just
 * noticeable difference (JND).
 *
 * @see http://www.ece.rochester.edu/~gsharma/ciede2000/
 * @see https://en.wikipedia.org/wiki/Color_difference
 * @see https://en.wikipedia.org/wiki/Just-noticeable_difference
 */
export function deltaE2000(color1: ColorLike, color2: ColorLike): number {
  const {L: L1, a: a1, b: b1} = rgbToLab(toRgb(color1, tempRgb));
  const {L: L2, a: a2, b: b2} = rgbToLab(toRgb(color2, tempRgb));

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
export function isJustNoticeableDifference(color1: ColorLike, color2: ColorLike): boolean {
  return color1 === color2 || deltaE2000(color1, color2) < 2.3;
}

/**
 * Returns `true` if colors are exactly equal.
 */
export function isEqualColor(color1: ColorLike, color2: ColorLike, ignoreOpacity = true): boolean {
  if (color1 === color2) {
    return true;
  }
  const rgb1 = toRgb(color1, tempRgb);
  const rgb2 = toRgb(color2, tempRgb);
  return rgb1.r === rgb2.r && rgb1.g === rgb2.g && rgb1.b === rgb2.b && (ignoreOpacity || rgb1.alpha === rgb2.alpha);
}

/**
 * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation.
 *
 * @return number in `[0, 255]` range.
 * @see http://alienryderflex.com/hsp.html
 */
export function toGrayscale(color: ColorLike): number {
  const {r, g, b} = toRgb(color, tempRgb);
  return sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
}

/**
 * Returns `true` if the input color is dark and `false` if it's bright.
 *
 * @see https://awik.io/determine-color-bright-dark-using-javascript/
 */
export function isDark(color: ColorLike): boolean {
  return toGrayscale(color) < 127.5;
}

/**
 * Returns color from `colors` that is the closest to `color` basing on CIEDE2000 comparison algorithm.
 */
export function pickClosestColor(colors: Array<IHsl>, color: IHsl): IHsl | undefined {
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
