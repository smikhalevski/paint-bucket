import { ColorModel, RGB } from './color-model';
import { clamp } from './utils';

// RGBa color components that are used for implicit model-to-model conversions
const tempRGB: RGB = [0, 0, 0, 1];

// Black RGBa color that is returned if gradient has zero domain size
const blackRGB: RGB = [0, 0, 0, 1];

/**
 * Merge declaration with this interface to add more types to {@link ColorLike} type.
 */
export interface ColorLikeSource {
  '@paint-bucket/core': Color;
}

/**
 * The type of the value that can be parsed into a {@link Color} instance using {@link Color.parse} function.
 */
export type ColorLike = ColorLikeSource[keyof ColorLikeSource];

export interface ColorConstructor {
  /**
   * Creates a new black {@link Color} instance.
   */
  new (): Color;

  /**
   * Creates a new {@link Color} instance.
   *
   * @param model The initial color model.
   * @param components The initial color components.
   */
  new (model: ColorModel, components: number[]): Color;

  /**
   * The {@link Gradient} constructor.
   */
  Gradient: GradientConstructor;

  readonly prototype: Color;

  /**
   * Parser that transforms input values into {@link Color} instances. When another color instance is provided, it is
   * cloned.
   *
   * @param value The value to parse.
   * @return The parsed color, or black color if value is invalid.
   */
  parse(value: ColorLike): Color;

  /**
   * Applies plugin to the {@link ColorConstructor}.
   *
   * @param plugin The plugin to apply.
   */
  applyPlugin(plugin: (constructor: ColorConstructor) => void): void;
}

/**
 * Provides color manipulation API that is extensible via plugins.
 */
export interface Color {
  /**
   * The color value version that is auto-incremented every time the {@link useComponents} method is called. This
   * version can be used to track that the color value was changed, for example to invalidate caches that rely on
   * current color value.
   */
  readonly version: number;

  /**
   * Creates a clone of this {@link Color} instance.
   *
   * @returns The cloned instance.
   */
  clone(): Color;

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
  getComponents(model: ColorModel): readonly number[];

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
  useComponents(model: ColorModel): number[];
}

export interface GradientConstructor {
  /**
   * Creates the new {@link Gradient} instance.
   *
   * @param colors The list of colors that comprise the gradient.
   * @param domain The stop values for each color. Values must be sorted in ascending order. The number of domain
   *     values must exactly match the number of provided colors.
   */
  new (colors: readonly Color[], domain: readonly number[]): Gradient;

  readonly prototype: Gradient;
}

export interface Gradient {
  /**
   * The list of colors that comprise the gradient.
   */
  readonly colors: readonly Color[];

  /**
   * The stop values for each color.
   */
  readonly domain: readonly number[];

  /**
   * Returns color components that correspond to a value from the gradient domain.
   *
   * **Note:** Don't keep reference to the returned array because it is reused between {@link getComponents}
   * invocations.
   *
   * @param value The domain value.
   * @param model The color model that provides the components for interpolation.
   * @param interpolatorFactory The function that returns an interpolator.
   * @returns The read-only components array.
   */
  getComponents(model: ColorModel, value: number, interpolatorFactory: InterpolatorFactory): readonly number[];
}

/**
 * The interpolator function that returns an interpolated value for the given argument.
 */
export interface Interpolator {
  (x: number): number;

  /**
   * Update the interpolation domain. Used if stop colors of the gradient are changed.
   */
  update?(xs: readonly number[], ys: readonly number[]): void;
}

/**
 * Factory that returns an interpolator function for given pivot points.
 */
export type InterpolatorFactory = (xs: readonly number[], ys: readonly number[]) => Interpolator;

class Color_ {
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
   * The color model that was last acquired by {@link getComponents}.
   */
  private _tempModel: ColorModel | null = null;

  /**
   * Color components of the {@link _tempModel}.
   */
  private _tempComponents: number[] | null = null;

  constructor(model = RGB, components = [0, 0, 0, 1]) {
    this._model = model;
    this._components = components;
  }

  static parse(value: ColorLike): Color {
    return value instanceof Color ? value.clone() : new Color();
  }

  static applyPlugin(plugin: (constructor: ColorConstructor) => void): void {
    plugin(Color);
  }

  clone(): Color {
    return new Color(this._model, this._components.slice(0));
  }

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

  useComponents(model: ColorModel): number[] {
    let { _components, _tempComponents } = this;

    ++this.version;

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

/**
 * Provides color gradient manipulation API that is extensible via plugins.
 */
class Gradient_ {
  /**
   * Color components returned by the {@link getComponents} method.
   */
  private _tempComponents: number[] = [0, 0, 0, 1];

  /**
   * The cumulative version of colors in this gradient instance that was computed during the last {@link getComponents}
   * call.
   */
  private _gradientVersion?: number;

  /**
   * The model that was requested during the last {@link getComponents} call.
   */
  private _model?: ColorModel;

  /**
   * The interpolation factory that was used during the last {@link getComponents} call.
   */
  private _interpolatorFactory?: InterpolatorFactory;

  /**
   * Color component interpolators that were produced by {@link _interpolatorFactory} for components provided by the
   * {@link _model} for colors with cumulative version {@link _gradientVersion}.
   */
  private _interpolators: Interpolator[] = [];

  /**
   * Component values grouped by channel.
   */
  private _componentValues: number[][] = [];

  constructor(readonly colors: readonly Color[], readonly domain: readonly number[]) {}

  getComponents(model: ColorModel, value: number, interpolatorFactory: InterpolatorFactory): readonly number[] {
    const { colors, domain, _tempComponents, _componentValues, _interpolatorFactory, _interpolators } = this;

    const { componentCount } = model;
    const domainLength = domain.length;

    let gradientVersion = 0;

    // Empty gradients are rendered as black
    if (domainLength === 0) {
      if (this._model !== model) {
        model.convertRGBToComponents(blackRGB, _tempComponents);
      }
      this._model = model;
      return _tempComponents;
    }

    if (domainLength === 1) {
      return this.colors[0].getComponents(model);
    }

    for (const color of this.colors) {
      gradientVersion += color.version;
    }

    if (this._gradientVersion !== gradientVersion || this._model !== model) {
      // Update color component interpolators

      for (let i = 0; i < domainLength; ++i) {
        const components = colors[i].getComponents(model);

        for (let j = 0; j < componentCount; ++j) {
          (_componentValues[j] ||= [])[i] = components[j];
        }
      }

      this._gradientVersion = gradientVersion;
      this._model = model;

      // Create or update interpolators
      for (let i = 0, update; i < componentCount; ++i) {
        if (
          _interpolatorFactory === interpolatorFactory &&
          _interpolators.length > i &&
          (update = _interpolators[i].update) !== undefined
        ) {
          update(domain, _componentValues[i]);
        } else {
          _interpolators[i] = interpolatorFactory(domain, _componentValues[i]);
        }
      }
      this._interpolatorFactory = interpolatorFactory;
    }

    // Interpolate components
    for (let i = 0; i < componentCount; ++i) {
      _tempComponents[i] = clamp(_interpolators[i](value));
    }

    return _tempComponents;
  }
}

/**
 * The {@link Color} constructor.
 */
export const Color = Color_ as unknown as ColorConstructor;

Color.Gradient = Gradient_ as unknown as GradientConstructor;
