import {fromBytes, getColorByte} from '../packed-color';
import {ColorSpace, ILabColor, PackedColor} from '../color-types';
import {FF} from '../int';

/**
 * Assembles a color in CIELAB color space.
 *
 * @param L L* ∈ [0, 100].
 * @param A a* ∈ [-128, 128].
 * @param B b* ∈ [-128, 128].
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function lab(L: number, A: number, B: number, a = 1): ILabColor {
  return {colorSpace: ColorSpace.LAB, L, A, B, a};
}

export function packLab(lab: ILabColor): PackedColor {
  return fromBytes(
      ColorSpace.LAB,
      FF * lab.L / 100,
      lab.A + 128,
      lab.B + 128,
      FF * lab.a,
  );
}

export function unpackLab(packedLab: PackedColor, lab: ILabColor): ILabColor {
  lab.L = getColorByte(packedLab, 0) / FF * 100;
  lab.A = getColorByte(packedLab, 1) - 128;
  lab.B = getColorByte(packedLab, 2) - 128;
  lab.a = getColorByte(packedLab, 3) / FF;

  return lab;
}
