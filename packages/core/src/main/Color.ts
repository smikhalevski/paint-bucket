import {ColorModel, Rgb} from './color-model';

const tempRgb: Rgb = [0, 0, 0, 1];
const tempComponents: number[] = [];

/**
 * Re-declare this interface in the plugin package to extend {@link color} function signature.
 *
 * **Note:** Only one-argument signatures are allowed.
 */
export interface ColorFunction {

  /**
   * Creates a new black color.
   */
  (): Color;

  /**
   * Clones a {@link Color} instance.
   *
   * @param color The color to clone.
   * @returns The new color instance.
   */
  (color: Color): Color;
}

export type ColorLike = Exclude<Parameters<ColorFunction>[0], void>;

// Rest arguments aren't used to prevent excessive array allocation.
/**
 * Creates a new {@link Color} instance.
 */
export const color = ((value?: unknown) => Color.factory(value)) as ColorFunction;

/**
 * Provides color manipulation API that is extensible via plugins.
 */
export class Color {

  /**
   * Creates the new {@link Color} instance.
   *
   * Use {@link overrideFactory} to override factory implementation.
   */
  public static factory(value: unknown): Color {
    return value instanceof Color ? value.clone() : new Color();
  };

  /**
   * Overrides the current {@link factory} implementation.
   *
   * Use this in plugins to add new parsing mechanisms or static methods for {@link color}.
   */
  public static overrideFactory(cb: (prevFactory: (value: unknown) => Color) => (value: unknown) => Color): void {
    Color.factory = cb(Color.factory);
  }

  /**
   * The active color model or `undefined` if {@link Color} was created without any model which means that a it
   * represents a black color.
   */
  protected model;

  /**
   * Readonly active color components in the color model returned by {@link model}.
   */
  protected components;

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
   * Use this method in plugins to acquire color components without changing the current model of {@link Color}
   * instance. Usually this is required if plugin method returns a computed value.
   *
   * @param model The color model that provides color components.
   * @returns Readonly color components.
   */
  public get(model: ColorModel): readonly number[] {
    if (this.model === model) {
      return this.components;
    }
    this.model.componentsToRgb(this.components, tempRgb);
    model.rgbToComponents(tempRgb, tempComponents);
    return tempComponents;
  }

  /**
   * Returns mutable color components of this {@link Color} in particular color model.
   *
   * Use this method in plugins if you want {@link Color} instance to switch active color model. Usually this is
   * required if plugin method returns this {@link Color} instance for chaining.
   *
   * @param model The color model that provides color components.
   * @returns Mutable color components.
   */
  public use(model: ColorModel): number[] {
    if (this.model === model) {
      return this.components;
    }
    this.model.componentsToRgb(this.components, tempRgb);
    model.rgbToComponents(tempRgb, this.components);
    return this.components;
  }
}
