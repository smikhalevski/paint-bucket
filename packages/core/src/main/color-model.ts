/**
 * The color model creates instances of color components and defines transformation from and to RGBa color model.
 *
 * @template C The type of color components used by this color model.
 */
export interface ColorModel {

  /**
   * Converts color components to RGBa color model.
   *
   * @param components The color components.
   * @param rgb The RGBa color components to update.
   */
  componentsToRgb(components: number[], rgb: Rgb): void;

  /**
   * Converts color components from RGBa color model to this color model.
   *
   * @param rgb RGBa color components.
   * @param components The color components that must be updated.
   * @returns The updated color components or `undefined` if `components` should be used.
   */
  rgbToComponents(rgb: Rgb, components: number[]): void;
}

/**
 * Color components of the RGBa color model.
 */
export type Rgb = [R: number, G: number, B: number, a: number];

/**
 * RGBa color model definition.
 */
export const Rgb: ColorModel = {
  componentsToRgb: copyComponents,
  rgbToComponents: copyComponents,
};

function copyComponents(components: number[], rgb: Rgb): void {
  rgb[0] = components[0];
  rgb[1] = components[1];
  rgb[2] = components[2];
  rgb[3] = components[3];
}
