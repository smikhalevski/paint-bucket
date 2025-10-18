import { ColorLike, ColorModel } from './types.js';
import { RGB } from './rgb.js';

// RGBa color components that are used for implicit model-to-model conversions
const tempRGB: RGB = [0, 0, 0, 1];

/**
 * Provides color manipulation API that is extensible via plugins.
 */
export class Color {
  /**
   * The color value version that is auto-incremented every time the {@link useComponents} method is called. This
   * version can be used to track that the color value was changed, for example to invalidate caches that rely on
   * current color value.
   */
  get version(): number {
    return this._version;
  }

  protected _version = 1;

  /**
   * The current color model.
   */
  protected _model: ColorModel;

  /**
   * Color components of the {@link _model}.
   */
  protected _components: number[];

  /**
   * The color model that was last acquired by {@link getComponents}.
   */
  protected _tempModel: ColorModel | null = null;

  /**
   * Color components of the {@link _tempModel}.
   */
  protected _tempComponents: number[] | null = null;

  /**
   * Creates a new black {@link Color} instance.
   */
  constructor();

  /**
   * Creates a new {@link Color} instance.
   *
   * @param model The initial color model.
   * @param components The initial color components.
   */
  constructor(model: ColorModel, components: number[]);

  constructor(model = RGB, components = [0, 0, 0, 1]) {
    this._model = model;
    this._components = components;
  }

  /**
   * Parser that transforms input values into {@link Color} instances. When another color instance is provided, it is
   * returned as is.
   *
   * @param value The value to parse.
   * @returns The parsed color, or black color if value is invalid.
   * @see {@link clr}
   */
  static parse(value: ColorLike): Color {
    return value instanceof Color ? value : new Color();
  }

  /**
   * Creates a clone of this {@link Color} instance.
   *
   * @returns The cloned instance.
   */
  clone(): Color {
    return new Color(this._model, this._components.slice(0));
  }

  /**
   * Returns read-only color components of this {@link Color} in a particular color model. Components are in [0, 1]
   * range.
   *
   * Use this method to acquire color components without changing the current model of this {@link Color} instance.
   * Usually this is required if plugin method returns a computed value.
   *
   * **Note:** Don't keep reference to the returned array because it is reused between {@link getComponents}
   * invocations.
   *
   * @param model The color model that provides color components.
   * @returns Read-only color components.
   */
  getComponents(model: ColorModel): readonly number[] {
    let { _components, _tempComponents } = this;

    if (this._tempModel === model && _tempComponents !== null) {
      return _tempComponents;
    }
    if (this._model === model) {
      return _components;
    }

    this._tempModel = model;

    if (_tempComponents === null) {
      this._tempComponents = _tempComponents = [];
    }

    // Convert components to the temp model
    this._model.convertComponentsToRGB(_components, tempRGB);
    model.convertRGBToComponents(tempRGB, _tempComponents);

    return _tempComponents;
  }

  /**
   * Returns mutable color components of this {@link Color} in a particular color model. Components are in [0, 1] range.
   *
   * Use this method in plugins if you want {@link Color} instance to switch the current color model or if you want to
   * update color components.
   *
   * **Note:** Don't keep reference to the returned array because it is reused between {@link useComponents}
   * invocations.
   *
   * @param model The color model that provides color components.
   * @returns Mutable color components.
   */
  useComponents(model: ColorModel): number[] {
    let { _components, _tempComponents } = this;

    ++this._version;

    // Reuse temp components when models are matching
    if (this._tempModel === model && _tempComponents !== null) {
      this._model = model;

      for (let i = 0; i < model.componentCount; ++i) {
        _components[i] = _tempComponents[i];
      }
    }

    // Clear temp model because the returned components are intended to be updated
    this._tempModel = null;

    if (this._model === model) {
      return _components;
    }

    // Convert components to the new model
    this._model.convertComponentsToRGB(_components, tempRGB);
    model.convertRGBToComponents(tempRGB, _components);

    // Update current model
    this._model = model;

    return _components;
  }
}
