import {getColorByte, getColorModel, NakedColor} from './bytes';
import {rgb, toColorModel, toRgb} from './colors';

/**
 * Returns color that lies between `color1` and `color2` at position `t`.
 */
export function gradient(color1: NakedColor, color2: NakedColor, t: number): NakedColor {

  const rgb1 = toRgb(color1);
  const rgb2 = toRgb(color1);

  const r1 = getColorByte(rgb1, 0);
  const g1 = getColorByte(rgb1, 1);
  const b1 = getColorByte(rgb1, 2);
  const a1 = getColorByte(rgb1, 3);

  const r2 = getColorByte(rgb2, 0);
  const g2 = getColorByte(rgb2, 1);
  const b2 = getColorByte(rgb2, 2);
  const a2 = getColorByte(rgb2, 3);

  const result = rgb(
      (r1 + (r2 - r1)) * t,
      (g1 + (g2 - g1)) * t,
      (b1 + (b2 - b1)) * t,
      (a1 + (a2 - a1)) * t / 0xFF,
  );

  return toColorModel(result, getColorModel(color1));
}
