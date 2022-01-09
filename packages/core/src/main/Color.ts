import {ColorModel, Rgb} from './color-model';
import {Parameter} from './utility-types';

// RGBa color components that are used for implicit model-to-model conversions
const tempRgb: Rgb = [0, 0, 0, 1];

const tempComponents: number[] = [0, 0, 0, 1];

/**
 * Returns the new {@link Color} instance.
 */
export const color = ((value) => Color.parser(value)) as ColorFunction;

/**
 * Re-declare this interface in the plugin package to extend {@link color} function signature.
 *
 * **Note:** Only one-argument signatures are allowed.
 */
export interface ColorFunction {

  /**
   * Creates the new black color.
   */
  (): Color;

  /**
   * Clones the {@link Color} instance.
   *
   * @param color The color to clone.
   * @returns The new color instance.
   */
  (color: Color): Color;
}

/**
 * The type of the value that can be parsed into a {@link Color} instance using {@link color} function.
 */
export type ColorLike = Parameter<ColorFunction>;

/**
 * Provides color manipulation API that is extensible via plugins.
 */
export class Color {

  /**
   * Parser that transforms input values into {@link Color} instances.
   */
  public static parser = (value: unknown): Color => value instanceof Color ? value.clone() : new Color();

  /**
   * Overrides parsing implementation that backs the {@link color} function.
   *
   * Use this in plugins to add new parsing mechanisms or static methods for {@link color} function.
   */
  public static overrideParser(cb: (next: (value: unknown) => Color) => (value: unknown) => Color): void {
    this.parser = cb(this.parser);
  }

  /**
   * The current color model.
   */
  protected model;

  /**
   * Color color components of the current color model.
   */
  protected components;

  /**
   * Creates a new {@link Color} instance.
   *
   * @param model The initial color model.
   * @param components The initial color components.
   */
  public constructor(model: ColorModel = Rgb, components: number[] = [0, 0, 0, 1]) {
    this.model = model;
    this.components = components;
  }

  /**
   * Creates a clone of this {@link Color} instance.
   *
   * @returns The cloned instance.
   */
  public clone(): Color {
    return new Color(this.model, this.components.slice(0));
  }

  /**
   * Returns readonly color components of this {@link Color} in particular color model.
   *
   * Use this method to acquire color components without changing the current model of this {@link Color} instance.
   * Usually this is required if plugin method returns a computed value.
   *
   * **Note:** Don't keep reference to the returned array because it is reused.
   *
   * @param model The color model that provides color components.
   * @returns Readonly color components.
   */
  public get(model: ColorModel): readonly number[] {
    return this._getOrUpdate(model, tempComponents);
  }

  /**
   * Returns mutable color components of this {@link Color} in particular color model.
   *
   * Use this method in plugins if you want {@link Color} instance to switch the current color model or to update color
   * components.
   *
   * @param model The color model that provides color components.
   * @returns Mutable color components.
   */
  public use(model: ColorModel): number[] {
    this._getOrUpdate(model, this.components);
    this.model = model;
    return this.components;
  }

  /**
   * Returns current color components or updates `components` if current model doesn't match `model`.
   */
  private _getOrUpdate(model: ColorModel, components: number[]): number[] {
    if (this.model === model) {
      return this.components;
    }
    this.model.componentsToRgb(this.components, tempRgb);
    model.rgbToComponents(tempRgb, components);
    return components;
  }
}
