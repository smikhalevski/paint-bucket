import { ColorModel, Rgb } from './color-model';

// RGBa color components that are used for implicit model-to-model conversions
const tempRgb: Rgb = [0, 0, 0, 1];

/**
 * Merge declaration with this interface to add more types to {@link ColorLike} type.
 */
export interface InjectColorLike {
  '@paint-bucket/core': Color;
}

/**
 * The type of the value that can be parsed into a {@link Color} instance using {@link Color.parse} function.
 */
export type ColorLike = InjectColorLike[keyof InjectColorLike];

/**
 * Provides color manipulation API that is extensible via plugins.
 */
export class Color {
  /**
   * The color value version that is auto-incremented every time the {@link use} method is called. This version can be
   * used to track that the color value was changed, for example to invalidate caches that rely on current color value.
   */
  version = 0;

  /**
   * The current color model.
   */
  private _model: ColorModel;

  /**
   * Color components of the {@link _model}.
   */
  private _components: number[];

  /**
   * The color model that was last acquired by {@link get}.
   */
  private _tempModel?: ColorModel;

  /**
   * Color components of the {@link _tempModel}.
   */
  private _tempComponents?: number[];

  /**
   * Creates a new {@link Color} instance.
   *
   * @param model The initial color model.
   * @param components The initial color components.
   */
  constructor(model = Rgb, components = [0, 0, 0, 1]) {
    this._model = model;
    this._components = components;
  }

  /**
   * Parser that transforms input values into {@link Color} instances.
   *
   * @param value The value to parse.
   * @return The parsed color, or black color if value is invalid.
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
   * Returns read-only color components of this {@link Color} in a particular color model.
   *
   * Use this method to acquire color components without changing the current model of this {@link Color} instance.
   * Usually this is required if plugin method returns a computed value.
   *
   * **Note:** Don't keep reference to the returned array because it is reused between {@link get} invocations.
   *
   * @param model The color model that provides color components.
   * @returns Read-only color components.
   */
  get(model: ColorModel): readonly number[] {
    let { _components, _tempComponents } = this;

    if (this._tempModel === model && _tempComponents) {
      return _tempComponents;
    }
    if (this._model === model) {
      return _components;
    }

    this._tempModel = model;
    this._tempComponents = _tempComponents ||= [];

    // Convert components to the temp model
    this._model.componentsToRgb(_components, tempRgb);
    model.rgbToComponents(tempRgb, _tempComponents);

    return _tempComponents;
  }

  /**
   * Returns mutable color components of this {@link Color} in a particular color model.
   *
   * Use this method in plugins if you want {@link Color} instance to switch the current color model or if you want to
   * update color components.
   *
   * **Note:** Don't keep reference to the returned array because it is reused between {@link use} invocations.
   *
   * @param model The color model that provides color components.
   * @returns Mutable color components.
   */
  use(model: ColorModel): number[] {
    let { _components, _tempComponents } = this;

    ++this.version;

    // Reuse temp components when models are matching
    if (this._tempModel === model && _tempComponents) {
      this._model = model;

      for (let i = 0; i < model.componentCount; ++i) {
        _components[i] = _tempComponents[i];
      }
    }

    // Clear temp model because the returned components are intended to be updated
    this._tempModel = undefined;

    if (this._model === model) {
      return _components;
    }

    // Convert components to the new model
    this._model.componentsToRgb(_components, tempRgb);
    model.rgbToComponents(tempRgb, _components);

    // Update current model
    this._model = model;

    return _components;
  }
}
