import {composeComponents, getColorComponent, IRgb} from '@paint-bucket/core';

/**
 * Converts normalized 32-bit RGBa color components to {@link IRgb} instance.
 */
export function intToRgb(rgb32: number, rgb: IRgb): IRgb {
  rgb.R = getColorComponent(rgb32, 0) / 0xFF;
  rgb.G = getColorComponent(rgb32, 1) / 0xFF;
  rgb.B = getColorComponent(rgb32, 2) / 0xFF;
  rgb.a = getColorComponent(rgb32, 3) / 0xFF;
  return rgb;
}

/**
 * Converts {@link IRgb} instance to 32-bit RGBa color components.
 */
export function rgbToInt(rgb: IRgb): number {
  return composeComponents(
      rgb.R * 0xFF,
      rgb.G * 0xFF,
      rgb.B * 0xFF,
      rgb.a * 0xFF,
  );
}
