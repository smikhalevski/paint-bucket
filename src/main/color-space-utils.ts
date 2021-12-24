import {hslToRgb, rgbToHsl, rgbToXyz, xyzToLab} from './color-spaces';
import {Color, ColorSpace, Hsl, Lab, RawColor, Rgb, Xyz} from './colors';
import {tempHsl, tempLab, tempRgb, tempXyz, toTempColor} from './temp-colors';
import {getColorSpace} from './raw-color-utils';

export function convertRawColorSpace(rawColor: RawColor, colorSpace: ColorSpace): RawColor {
  if (getColorSpace(rawColor) === colorSpace) {
    return rawColor;
  }
  // @formatter:off
  switch (colorSpace) {
    case ColorSpace.RGB: return convertColorSpace(toTempColor(rawColor), tempRgb).getRawColor();
    case ColorSpace.HSL: return convertColorSpace(toTempColor(rawColor), tempHsl).getRawColor();
    case ColorSpace.XYZ: return convertColorSpace(toTempColor(rawColor), tempXyz).getRawColor();
    case ColorSpace.LAB: return convertColorSpace(toTempColor(rawColor), tempLab).getRawColor();
  }
  // @formatter:on
  throw Error('Unknown color space');
}

export function convertColorSpace(sourceColor: Color, targetColor: Rgb): Rgb;

export function convertColorSpace(sourceColor: Color, targetColor: Hsl): Hsl;

export function convertColorSpace(sourceColor: Color, targetColor: Xyz): Xyz;

export function convertColorSpace(sourceColor: Color, targetColor: Lab): Lab;

export function convertColorSpace(sourceColor: Color, targetColor: Color): Color;

export function convertColorSpace(sourceColor: Color, targetColor: Color): Color {

  // @formatter:off
  switch (sourceColor.colorSpace) {

    case ColorSpace.RGB:
      switch (targetColor.colorSpace) {
        case ColorSpace.RGB: return sourceColor;
        case ColorSpace.HSL: return rgbToHsl(sourceColor, targetColor);
        case ColorSpace.XYZ: return rgbToXyz(sourceColor, targetColor);
        case ColorSpace.LAB: return xyzToLab(rgbToXyz(sourceColor, tempXyz), targetColor);
      }
      break;

    case ColorSpace.HSL:
      switch (targetColor.colorSpace) {
        case ColorSpace.RGB: return hslToRgb(sourceColor, targetColor);
        case ColorSpace.HSL: return sourceColor;
        case ColorSpace.XYZ: return rgbToXyz(hslToRgb(sourceColor, tempRgb), targetColor);
        case ColorSpace.LAB: return xyzToLab(rgbToXyz(hslToRgb(sourceColor, tempRgb), tempXyz), targetColor);
      }
      break;

    case ColorSpace.XYZ:
      switch (targetColor.colorSpace) {
        case ColorSpace.RGB: throw new Error('No converter for XYZ → RGB');
        case ColorSpace.HSL: throw new Error('No converter for XYZ → HSL');
        case ColorSpace.XYZ: return sourceColor;
        case ColorSpace.LAB: return xyzToLab(sourceColor, targetColor);
      }
      break;

    case ColorSpace.LAB:
      switch (targetColor.colorSpace) {
        case ColorSpace.RGB: throw new Error('No converter for LAB → RGB');
        case ColorSpace.HSL: throw new Error('No converter for LAB → HSL');
        case ColorSpace.XYZ: throw new Error('No converter for LAB → XYZ');
        case ColorSpace.LAB: return sourceColor;
      }
      break;
  }
  // @formatter:on
  throw Error('Unknown color space');
}
