/**
 * Color components of the RGBa color model.
 */
export interface IRgb {

  /**
   * Red ∈ [0, 255].
   */
  R: number;

  /**
   * Green ∈ [0, 255].
   */
  G: number;

  /**
   * Blue ∈ [0, 255].
   */
  B: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

/**
 * The color model creates instances of color components and defines transformation from and to RGBa color model.
 *
 * @template C The type of color components used by this color model.
 */
export interface IColorModel<C = unknown> {

  /**
   * Creates the new black color components.
   */
  createComponents(): C;

  /**
   * Clones color components.
   *
   * @param components The color components to clone.
   * @return The cloned color components.
   */
  cloneComponents(components: C): C;

  /**
   * Converts color components to RGBa color model.
   *
   * @param components The color components.
   * @param rgb The RGBa color components to update.
   */
  componentsToRgb(components: C, rgb: IRgb): void;

  /**
   * Converts color components from RGBa color model to this color model.
   *
   * @param rgb RGBa color components.
   * @param components The color components that must be updated.
   * @returns The updated color components or `undefined` if `components` should be used.
   */
  rgbToComponents(rgb: IRgb, components: C): C | void;
}
