import {IColorModel, IRgb} from './color-types';

// Internal RGBa color components that are used for model-to-model conversions.
const internalRgb: IRgb = {R: 0, G: 0, B: 0, a: 1};

/**
 * Re-declare this interface in plugin to extend {@link color} function signature.
 */
export interface IColorFactory {

  /**
   * Creates a new black color.
   */
  (): Color;
}

export class Color {

  /**
   * Creates the new {@link Color} instance.
   */
  public static factory: IColorFactory = () => Color.create();

  /**
   * Overrides the current factory implementation.
   *
   * Use this in plugins to add new parsing mechanisms or static methods for {@link color}.
   */
  public static extendFactory(cb: (factory: IColorFactory) => IColorFactory): void {
    Color.factory = cb(Color.factory);
  }

  /**
   * Cache of color components used by this {@link Color} instance. These map is lazily created and updated when
   * {@link forRead} and {@link forUpdate} methods are invoked.
   */
  private colorCache?: Map<IColorModel, unknown>;

  /**
   * The currently active color model.
   */
  private colorModel;

  /**
   * The color components in the active color model.
   */
  private components;

  /**
   * Creates a new {@link Color} instance backed by black RGBa color.
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

  public static create<C>(colorModel?: IColorModel<C>, components = colorModel?.black()): Color {
    return new Color(colorModel, components);
  }

  private constructor(colorModel?: IColorModel, components?: unknown) {
    this.colorModel = colorModel;
    this.components = components;
  }

  /**
   * Returns color components of this {@link Color} in particular color model.
   *
   * Use this method in plugins to acquire color components without changing the current model of {@link Color}
   * instance. Usually this is required if plugin method returns a computed value.
   *
   * @param colorModel The color model that provides color components.
   * @returns The read-only color components.
   */
  protected forRead<C>(colorModel: IColorModel<C>): Readonly<C> {
    if (this.colorModel === colorModel) {
      return this.components as C;
    }

    this.colorCache ||= new Map();

    let color = this.colorCache.get(colorModel) as C | undefined;

    if (color === undefined) {
      color = colorModel.black();
      this.colorCache.set(colorModel, color);
    }

    if (this.colorModel) {
      this.colorModel.componentsToRgb(this.components, internalRgb);
    } else {
      internalRgb.R = internalRgb.G = internalRgb.B = 0;
      internalRgb.a = 1;
    }

    return colorModel.rgbToComponents(internalRgb, color) || color;
  }

  /**
   * Returns color components of this {@link Color} in particular color model.
   *
   * Use this method in plugins if you want {@link Color} instance to use the provided color model for next calls.
   * Usually this is required if plugin method returns this {@link Color} instance for chaining.
   *
   * @param colorModel The color model that provides color components.
   * @returns The read-only color components.
   */
  protected forUpdate<C>(colorModel: IColorModel<C>): C {
    const components = this.forRead(colorModel);

    this.colorModel = colorModel;
    this.components = components;

    return components;
  }
}

/**
 * Creates a new {@link Color} instance.
 */
export const color = Color.factory;
