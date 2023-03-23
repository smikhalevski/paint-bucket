/**
 * The color model defines transformation from and to RGBa color model.
 */
export interface ColorModel {
  /**
   * The number of color components that the model uses.
   */
  readonly componentCount: number;

  /**
   * Converts color components to RGBa color model.
   *
   * @param components The color components.
   * @param rgb The RGBa color components to update.
   */
  convertComponentsToRGB(components: readonly number[], rgb: RGB): void;

  /**
   * Converts color components from RGBa color model to this color model.
   *
   * @param rgb RGBa color components.
   * @param components The color components that must be updated.
   */
  convertRGBToComponents(rgb: Readonly<RGB>, components: number[]): void;
}

/**
 * Color components of the RGBa color model.
 */
export type RGB = [R: number, G: number, B: number, a: number];

/**
 * RGBa color model definition.
 */
export const RGB: ColorModel = {
  componentCount: 4,
  convertComponentsToRGB: copyComponents,
  convertRGBToComponents: copyComponents,
};

function copyComponents(components: readonly number[], rgb: RGB): void {
  rgb[0] = components[0];
  rgb[1] = components[1];
  rgb[2] = components[2];
  rgb[3] = components[3];
}
