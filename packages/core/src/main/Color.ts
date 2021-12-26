import {IColorModel, IRgb} from './color-types';

// RGBa color components that are used for model-to-model conversions.
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

export class Color {

  /**
   * Creates the new {@link Color} instance.
   */
  public static factory(args: any[]): Color {
    return args[0] instanceof Color ? args[0].clone() : Color.create();
  };

  /**
   * Overrides the current factory implementation.
   *
   * Use this in plugins to add new parsing mechanisms or static methods for {@link color}.
   */
  public static extendFactory(cb: (prevFactory: (args: any[]) => Color) => (args: any[]) => Color): void {
    Color.factory = cb(Color.factory);
  }

  /**
   * Cache of color components used by this {@link Color} instance. These map is lazily created and updated when
   * {@link forRead} and {@link forUpdate} methods are invoked.
   */
  private _cache?: Map<IColorModel, unknown>;

  /**
   * The currently active color model.
   */
  private _model;

  /**
   * The color components in terms of the active color model.
   */
  private _components;

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

  public static create<C>(colorModel?: IColorModel<C>, components = colorModel?.createComponents()): Color {
    return new Color(colorModel, components);
  }

  protected constructor(colorModel?: IColorModel, components?: unknown) {
    this._model = colorModel;
    this._components = components;
  }

  /**
   * Creates a clone of this {@link Color} instance.
   *
   * @returns The cloned instance.
   */
  public clone(): Color {
    return new Color(this._model, this._model?.cloneComponents(this._components));
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
    if (this._model === colorModel) {
      return this._components as C;
    }

    this._cache ||= new Map();

    let color = this._cache.get(colorModel) as C | undefined;

    if (color === undefined) {
      color = colorModel.createComponents();
      this._cache.set(colorModel, color);
    }

    if (this._model) {
      this._model.componentsToRgb(this._components, tempRgb);
    } else {
      tempRgb.R = tempRgb.G = tempRgb.B = 0;
      tempRgb.a = 1;
    }

    return colorModel.rgbToComponents(tempRgb, color) || color;
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

    this._model = colorModel;
    this._components = components;

    return components;
  }
}

/**
 * Creates a new {@link Color} instance.
 */
export const color: IColorFactory = (...args: any[]) => Color.factory(args);
