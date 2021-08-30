import {ColorSpace, fromBytes, getColorByte, getColorFloat, NakedColor, packByte} from '../bytes';
import {max, min} from '../math';

export function rgbToHsl(rgb: NakedColor): NakedColor {
  const r = getColorFloat(rgb, 0);
  const g = getColorFloat(rgb, 1);
  const b = getColorFloat(rgb, 2);

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

  return fromBytes(
      ColorSpace.HSL,
      packByte(h, 0, 1),
      packByte(s, 0, 1),
      packByte(l, 0, 1),
      getColorByte(rgb, 3),
  );
}

export function hslToRgb(hsl: NakedColor): NakedColor {
  const h = getColorFloat(hsl, 0);
  const s = getColorFloat(hsl, 1);
  const l = getColorFloat(hsl, 2);

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

  return fromBytes(
      ColorSpace.RGB,
      packByte(r, 0, 1),
      packByte(g, 0, 1),
      packByte(b, 0, 1),
      getColorByte(hsl, 3),
  );
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
