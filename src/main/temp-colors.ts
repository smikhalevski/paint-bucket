import {Color, ColorSpace, Hsl, Lab, RawColor, Rgb, Xyz} from './colors';
import {getColorSpace} from './raw-color-utils';

export const tempRgb = new Rgb(0, 0, 0);
export const tempHsl = new Hsl(0, 0, 0);
export const tempXyz = new Xyz(0, 0, 0);
export const tempLab = new Lab(0, 0, 0);

export const blackRgb = tempRgb.getRawColor();

export function toTempColor(rawColor: RawColor): Color {
  // @formatter:off
  switch (getColorSpace(rawColor)) {
    case ColorSpace.RGB: return tempRgb.setRawColor(rawColor);
    case ColorSpace.HSL: return tempHsl.setRawColor(rawColor);
    case ColorSpace.XYZ: return tempXyz.setRawColor(rawColor);
    case ColorSpace.LAB: return tempLab.setRawColor(rawColor);
  }
  // @formatter:on
  throw Error('Unknown color space');
}
