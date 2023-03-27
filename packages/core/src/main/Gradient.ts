import { clamp } from '@paint-bucket/plugin-utils';
import { Color } from './Color';
import { ColorModel, RGB } from './color-model';

// Black RGBa color that is returned if gradient has zero domain size
const blackRGB: RGB = [0, 0, 0, 1];

/**
 * The interpolator function that returns an interpolated value for the given argument.
 */
export interface Interpolator {
  (x: number): number;

  /**
   * An optional callback to update the interpolation domain. Used if stop colors in the gradient are changed.
   */
  update?(xs: readonly number[], ys: readonly number[]): void;
}

/**
 * Factory that returns an interpolator function for given pivot points.
 */
export type InterpolatorFactory = (xs: readonly number[], ys: readonly number[]) => Interpolator;

/**
 * Provides color gradient manipulation API that is extensible via plugins.
 */
export class Gradient {
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
  private _componentValues: number[][] = [];

  /**
   * Creates the new {@link Gradient} instance.
   *
   * @param colors The list of colors that comprise the gradient.
   * @param domain The stop values for each color. Values must be sorted in ascending order. The number of domain
   *     values must exactly match the number of provided colors.
   */
  constructor(
    /**
     * The list of colors that comprise the gradient.
     */
    readonly colors: readonly Color[],
    /**
     * The stop values for each color.
     */
    readonly domain: readonly number[]
  ) {}

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
