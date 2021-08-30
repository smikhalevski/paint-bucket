import {pow} from '../math';
import {ColorSpace, fromBytes, getColorByte, getColorFloat, NakedColor, packByte} from '../bytes';

export function xyzToLab(xyz: NakedColor): NakedColor {

  const x = rotateXyz(getColorFloat(xyz, 0));
  const y = rotateXyz(getColorFloat(xyz, 1));
  const z = rotateXyz(getColorFloat(xyz, 2));

  const L = (116 * y) - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);

  return fromBytes(
      ColorSpace.LAB,
      packByte(L, 0, 100),
      packByte(a, -128, 128),
      packByte(b, -128, 128),
      getColorByte(xyz, 3),
  );
}

function rotateXyz(q: number): number {
  return q > 0.008856 ? pow(q, 1 / 3) : (7.787 * q) + 16 / 116;
}
