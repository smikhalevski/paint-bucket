import { ColorLike, ColorModel, Interpolator, InterpolatorFactory } from './types.js';
import { lerp } from 'algomatic';
import { Color } from './Color.js';
import { RGB } from './rgb.js';
import { clamp } from './utils.js';

// Black RGBa color that is returned if gradient has zero domain size
const blackRGB: RGB = [0, 0, 0, 1];

/**
 * Provides color gradient manipulation API that is extensible via plugins.
 */
export class Gradient {
  /**
   * The integer value that is incremented when an underlying color is changed.
   */
  get version(): number {
    let version = 0;

    for (let i = 0; i < this._colors.length; ++i) {
      version += this._colors[i].version;
    }
    return version;
  }

  /**
   * The list of colors that comprise the gradient.
   */
  protected _colors: Color[] = [];

  /**
   * The stop values for each color.
   */
  protected _domain: number[] = [];

  /**
   * Color components returned by the {@link getComponents} method.
   */
  protected _tempComponents: number[] = [0, 0, 0, 1];

  /**
   * The model that was requested during the last {@link getComponents} call.
   */
  protected _model?: ColorModel;

  /**
   * The version of the gradient that was interpolated during the last {@link getComponents} call.
   */
  protected _interpolatedVersion?: number;

  /**
   * The interpolation factory that was used during the last {@link getComponents} call.
   */
  protected _interpolatorFactory?: InterpolatorFactory;

  /**
   * Color component interpolators that were produced by {@link _interpolatorFactory} for components provided by the
   * {@link _model} for colors with cumulative version {@link _interpolatedVersion}.
   */
  protected _interpolators: Interpolator[] = [];

  /**
   * Component values grouped by channel.
   */
  protected _componentValues: number[][] = [];

  /**
   * Adds the new stop to the gradient.
   *
   * @param value The position of the stop.
   * @param color The color associated with the stop.
   */
  stop(value: number, color: ColorLike): Gradient {
    const { _domain, _colors } = this;

    color = Color.parse(color);

    for (let i = 0; i < _domain.length; ++i) {
      if (value < _domain[i]) {
        _domain.splice(i, 0, value);
        _colors.splice(i, 0, color);
        return this;
      }
    }

    _domain.push(value);
    _colors.push(color);
    return this;
  }

  /**
   * Returns the color at the given position in the gradient.
   *
   * @param x The value from the gradient domain for which the color is requested.
   * @param [model = RGB] The color model that should be used for interpolation.
   * @param [interpolatorFactory = lerp] The function that returns a color component interpolator.
   * @returns The new {@link Color} instance.
   */
  at(x: number, model = RGB, interpolatorFactory: InterpolatorFactory = lerp): Color {
    return new Color(model, this.getComponents(model, x, interpolatorFactory).slice(0));
  }

  /**
   * Returns color components that correspond to a value from the gradient domain.
   *
   * **Note:** Don't keep reference to the returned array because it is reused between {@link getComponents}
   * invocations.
   *
   * @param value The domain value.
   * @param model The color model that provides the components for interpolation.
   * @param interpolatorFactory The function that returns an interpolator. If the same function identity is provided on
   * each call, interpolation result is cached for better performance.
   * @returns The read-only components array.
   */
  getComponents(model: ColorModel, value: number, interpolatorFactory: InterpolatorFactory): readonly number[] {
    const { _colors, _domain, _tempComponents, _componentValues, _interpolatorFactory, _interpolators } = this;

    const { componentCount } = model;
    const domainLength = _domain.length;

    // Empty gradients are rendered as black
    if (domainLength === 0) {
      if (this._model !== model) {
        model.convertRGBToComponents(blackRGB, _tempComponents);
      }
      this._model = model;
      return _tempComponents;
    }

    if (domainLength === 1) {
      return this._colors[0].getComponents(model);
    }

    const interpolatedVersion = this.version;

    if (this._interpolatedVersion !== interpolatedVersion || this._model !== model) {
      // Update color component interpolators

      for (let i = 0; i < domainLength; ++i) {
        const components = _colors[i].getComponents(model);

        for (let j = 0; j < componentCount; ++j) {
          (_componentValues[j] ||= [])[i] = components[j];
        }
      }

      this._interpolatedVersion = interpolatedVersion;
      this._model = model;

      // Create or update interpolators
      for (let i = 0, update; i < componentCount; ++i) {
        if (
          _interpolatorFactory === interpolatorFactory &&
          _interpolators.length > i &&
          (update = _interpolators[i].update) !== undefined
        ) {
          update(_domain, _componentValues[i]);
        } else {
          _interpolators[i] = interpolatorFactory(_domain, _componentValues[i]);
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
