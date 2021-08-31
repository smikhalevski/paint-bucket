import {getColorSpace} from './packed-color';
import {hslToRgb, rgbToHsl} from './color-spaces/rgb-hsl';
import {rgbToXyz} from './color-spaces/rgb-xyz';
import {Color, ColorSpace, IHslColor, ILabColor, IRgbColor, IXyzColor, PackedColor} from './color-types';
import {rgb, unpackRgb} from './color-spaces/rgb';
import {unpackXyz, xyz} from './color-spaces/xyz';
import {hsl, unpackHsl} from './color-spaces/hsl';
import {lab, unpackLab} from './color-spaces/lab';
import {xyzToLab} from './color-spaces/xyz-lab';

const tempRgb = rgb(0, 0, 0);
const tempHsl = hsl(0, 0, 0);
const tempXyz = xyz(0, 0, 0);
const tempLab = lab(0, 0, 0);

export function unpackColor(color: PackedColor): Color {
  // @formatter:off
  switch (getColorSpace(color)) {
    case ColorSpace.RGB: return unpackRgb(color, tempRgb);
    case ColorSpace.HSL: return unpackHsl(color, tempHsl);
    case ColorSpace.XYZ: return unpackXyz(color, tempXyz);
    case ColorSpace.LAB: return unpackLab(color, tempLab);
  }
  // @formatter:on
  throw Error('Packed color uses unknown color space');
}

export function toColorSpace(color: Color, colorSpace: ColorSpace.RGB): IRgbColor;
export function toColorSpace(color: Color, colorSpace: ColorSpace.HSL): IHslColor;
export function toColorSpace(color: Color, colorSpace: ColorSpace.XYZ): IXyzColor;
export function toColorSpace(color: Color, colorSpace: ColorSpace.LAB): ILabColor;
export function toColorSpace(color: Color, colorSpace: ColorSpace): Color {
  // @formatter:off
  switch (color.colorSpace) {

    case ColorSpace.RGB:
      switch (colorSpace) {
        case ColorSpace.RGB: return color;
        case ColorSpace.HSL: return rgbToHsl(color, tempHsl);
        case ColorSpace.XYZ: return rgbToXyz(color, tempXyz);
        case ColorSpace.LAB: return xyzToLab(rgbToXyz(color, tempXyz), tempLab);
      }
      break;

    case ColorSpace.HSL:
      switch (colorSpace) {
        case ColorSpace.RGB: return hslToRgb(color, tempRgb);
        case ColorSpace.HSL: return color;
        case ColorSpace.XYZ: return rgbToXyz(hslToRgb(color, tempRgb), tempXyz);
        case ColorSpace.LAB: return xyzToLab(rgbToXyz(hslToRgb(color, tempRgb), tempXyz), tempLab);
      }
      break;

    case ColorSpace.XYZ:
      switch (colorSpace) {
        case ColorSpace.RGB: break;
        case ColorSpace.HSL: break;
        case ColorSpace.XYZ: return color;
        case ColorSpace.LAB: return xyzToLab(color, tempLab);
      }
      break;

    case ColorSpace.LAB:
      switch (colorSpace) {
        case ColorSpace.RGB: break;
        case ColorSpace.HSL: break;
        case ColorSpace.XYZ: break;
        case ColorSpace.LAB: return color;
      }
      break;
  }
  // @formatter:on
  throw new Error('No converter');
}
