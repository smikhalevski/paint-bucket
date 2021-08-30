import {fromRawBytes, getColorByte, getColorModel, NakedColor} from './bytes';
import {toColorModel} from './colors';

/**
 * Mixes `color1` and `color2` in  proportion `prc`.
 *
 * @param color1 The first color.
 * @param color2 The second color.
 * @param ratio The percentage of blend between `color1` and `color2`
 * @param colorModel The output color model. If omitted then color model of `color1` is used.
 */
export function blend(color1: NakedColor, color2: NakedColor, ratio: number, colorModel = getColorModel(color1)): NakedColor {

  color1 = toColorModel(color1, colorModel);
  color2 = toColorModel(color2, colorModel);

  const a1 = getColorByte(color1, 0);
  const b1 = getColorByte(color1, 1);
  const c1 = getColorByte(color1, 2);
  const d1 = getColorByte(color1, 3);

  const a2 = getColorByte(color2, 0);
  const b2 = getColorByte(color2, 1);
  const c2 = getColorByte(color2, 2);
  const d2 = getColorByte(color2, 3);

  return fromRawBytes(
      colorModel,
      (a1 + (a2 - a1)) * ratio,
      (b1 + (b2 - b1)) * ratio,
      (c1 + (c2 - c1)) * ratio,
      (d1 + (d2 - d1)) * ratio,
  );
}
