import {pow} from '../math';
import {ColorSpace, fromBytes, getColorByte, getColorFloat, NakedColor, packByte} from '../bytes';

export function rgbToXyz(rgb: NakedColor): NakedColor {

  const r = rotateRgb(getColorFloat(rgb, 0));
  const g = rotateRgb(getColorFloat(rgb, 1));
  const b = rotateRgb(getColorFloat(rgb, 2));

  const x = (r * 0.41246 + g * 0.35758 + b * 0.18044) / 0.95048;
  const y = (r * 0.21267 + g * 0.71515 + b * 0.07218);
  const z = (r * 0.01933 + g * 0.11919 + b * 0.95030) / 1.08882;

  return fromBytes(
      ColorSpace.XYZ,
      packByte(x, 0, 1),
      packByte(y, 0, 1),
      packByte(z, 0, 1),
      getColorByte(rgb, 3),
  );
}

function rotateRgb(q: number): number {
  return q > 0.04045 ? pow((q + 0.055) / 1.055, 2.4) : q / 12.92;
}
