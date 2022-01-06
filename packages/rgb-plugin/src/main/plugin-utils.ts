import {composeComponents, getColorComponent} from '@paint-bucket/core';

/**
 * Converts normalized 32-bit RGBa color components to {@link Rgb} instance.
 */
export function intToRgb(rgb32: number, rgb: number[]): void {
  rgb[0] = getColorComponent(rgb32, 0) / 0xFF;
  rgb[1] = getColorComponent(rgb32, 1) / 0xFF;
  rgb[2] = getColorComponent(rgb32, 2) / 0xFF;
  rgb[3] = getColorComponent(rgb32, 3) / 0xFF;
}

/**
 * Converts {@link Rgb} instance to 32-bit RGBa color components.
 */
export function rgbToInt(rgb: readonly number[]): number {
  return composeComponents(
      rgb[0] * 0xFF,
      rgb[1] * 0xFF,
      rgb[2] * 0xFF,
      rgb[3] * 0xFF,
  );
}
