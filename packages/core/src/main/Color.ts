import {IColorModel, IRgb} from './color-types';

// RGBa color components that are used for implicit model-to-model conversions.
const tempRgb: IRgb = {R: 0, G: 0, B: 0, a: 1};

/**
 * Re-declare this interface in plugin to extend {@link color} function signature.
 */
export interface IColorFactory {

  /**
   * Creates a new black color.
   */
  (): Color;

  /**
   * Creates a clone of {@link Color} instance.
   *
   * @param color The color to clone.
   * @returns The new color instance.
   */
  (color: Color): Color;
}

/**
 * Provides color manipulation API that is extensible via plugins.
 */
export class Color {

  /**
   * Creates the new {@link Color} instance.
   *
   * Use {@link overrideFactory} to override factory implementation.
   */
  public static factory(args: ReadonlyArray<any>): Color {
    return args[0] instanceof Color ? args[0].clone() : Color.create();
  };

  /**
   * Overrides the current {@link factory} implementation.
   *
   * Use this in plugins to add new parsing mechanisms or static methods for {@link color}.
   */
  public static overrideFactory(cb: (prevFactory: (args: any[]) => Color) => (args: any[]) => Color): void {
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

  /**
   * Cache of color components used by this {@link Color} instance for a particular color model.
   */
  private cache?: Map<IColorModel, unknown>;

  /**
   * Creates a new {@link Color} instance backed by black color.
   */
  public static create(): Color;

  /**
   * Creates a new {@link Color} instance.
   *
   * @param colorModel The initial color model.
   * @param components The initial color components. If omitted then black color is used.
   * @returns The new {@link Color} instance.
   */
  public static create<C>(colorModel: IColorModel<C>, components?: C): Color;

  public static create<C>(colorModel?: IColorModel<C>, components = colorModel?.createComponents()): Color {
    return new Color(colorModel, components);
  }

  protected constructor(colorModel?: IColorModel, components?: unknown) {
    this.model = colorModel;
    this.components = components;
  }

  /**
   * Creates a clone of this {@link Color} instance.
   *
   * @returns The cloned instance.
   */
  public clone(): Color {
    return new Color(this.model, this.model?.cloneComponents(this.components));
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
  protected get<C>(model: IColorModel<C>): Readonly<C> {
    if (this.model === model) {
      return this.components as C;
    }

    this.cache ||= new Map();

    let components = this.cache.get(model) as C | undefined;

    if (components === undefined) {
      components = model.createComponents();
      this.cache.set(model, components);
    }

    if (this.model) {
      this.cache.set(this.model, this.components);
      this.model.componentsToRgb(this.components, tempRgb);
    } else {
      this.model = model;
      this.components = components;

      tempRgb.R = tempRgb.G = tempRgb.B = 0;
      tempRgb.a = 1;
    }

    return model.rgbToComponents(tempRgb, components) || components;
  }

  /**
   * Sets the active color model and its components.
   *
   * Always prefer {@link use} over {@link set}. If components of color model are immutable for some reason, only then
   * you should use {@link set} as a fallback.
   */
  protected set<C>(model: IColorModel<C>, components: C): this {
    if (this.model === model) {
      this.components = components;
      return this;
    }
    if (this.model) {
      this.cache ||= new Map();
      this.cache.set(this.model, this.components);
    }
    this.model = model;
    this.components = components;
    return this;
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
  protected use<C>(model: IColorModel<C>): C {
    const components = this.get(model);

    this.model = model;
    this.components = components;

    return components;
  }
}

/**
 * Creates a new {@link Color} instance.
 */
export const color: IColorFactory = (...args: any[]) => Color.factory(args);
