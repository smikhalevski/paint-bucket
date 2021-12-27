import {composeComponents, getColorComponent, IRgb} from '@paint-bucket/core';

/**
 * Converts normalized 24-bit RGBa color components to {@link IRgb} instance.
 */
export function intToRgb(components: number, rgb: IRgb): IRgb {
  rgb.R = getColorComponent(components, 0) / 0xFF;
  rgb.G = getColorComponent(components, 1) / 0xFF;
  rgb.B = getColorComponent(components, 2) / 0xFF;
  rgb.a = getColorComponent(components, 3) / 0xFF;
  return rgb;
}

/**
 * Converts {@link IRgb} instance to 24-bit RGBa color components.
 */
export function rgbToInt(rgb: IRgb): number {
  return composeComponents(
      rgb.R * 0xFF,
      rgb.G * 0xFF,
      rgb.B * 0xFF,
      rgb.a * 0xFF,
  );
}
