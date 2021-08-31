import {fromBytes, getColorByte} from '../packed-color';
import {ColorSpace, IXyzColor, PackedColor} from '../color-types';
import {FF} from '../int';

export const MAX_X = 95.047;
export const MAX_Z = 108.883;

/**
 * Assembles a color in XYZ color space.
 *
 * @param X X ∈ [0, 95.047].
 * @param Y Y ∈ [0, 100].
 * @param Z Z ∈ [0, 108.883].
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function xyz(X: number, Y: number, Z: number, a = 1): IXyzColor {
  return {colorSpace: ColorSpace.XYZ, X, Y, Z, a};
}

export function packXyz(xyz: IXyzColor): PackedColor {
  return fromBytes(
      ColorSpace.XYZ,
      FF * xyz.X / MAX_X,
      FF * xyz.Y / 100,
      FF * xyz.Z / MAX_Z,
      FF * xyz.a,
  );
}

export function unpackXyz(packedXyz: PackedColor, xyz: IXyzColor): IXyzColor {
  xyz.X = getColorByte(packedXyz, 0) / FF * MAX_X;
  xyz.Y = getColorByte(packedXyz, 1) / FF * 100;
  xyz.Z = getColorByte(packedXyz, 2) / FF * MAX_Z;
  xyz.a = getColorByte(packedXyz, 3) / FF;

  return xyz;
}
