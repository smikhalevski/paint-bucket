import {ColorModel, Rgb} from './color-model';
import {Color} from './Color';
import {clamp1} from 'numeric-wrench';

// Black RGBa color that is returned if gradient has zero domain size
const blackRgb: Rgb = [0, 0, 0, 1];

export interface InterpolatorLike {
  (x: number): number;

  update?(xs: ArrayLike<number>, ys: ArrayLike<number>): void;
}

/**
 * Factory that returns an interpolator function for given pivot points.
 *
 * @see {@link https://smikhalevski.github.io/numeric-wrench/modules.html#lerp lerp}
 * @see {@link https://smikhalevski.github.io/numeric-wrench/modules.html#csplineMonot csplineMonot}
 */
export type InterpolatorFactory = (xs: ArrayLike<number>, ys: ArrayLike<number>) => InterpolatorLike;

/**
 * Provides color gradient manipulation API that is extensible via plugins.
 */
export class Gradient {

  protected colors;
  protected domain;

  /**
   * Color components returned by the {@link get} method.
   */
  private _tempComponents: number[] = [0, 0, 0, 1];

  /**
   * The cumulative version of colors in this gradient instance that was computed during the last {@link get} call.
   */
  private _prevVersion?: number;

  /**
   * The model that was requested during the last {@link get} call.
   */
  private _model?: ColorModel;

  /**
   * The interpolation factory that was used during the last {@link get} call.
   */
  private _interpolatorFactory?: InterpolatorFactory;

  /**
   * Color component interpolators that were produced by {@link _interpolatorFactory} for components provided by
   * {@link _model} for colors with cumulative version {@link _prevVersion}.
   */
  private _interpolators: InterpolatorLike[] = [];
  private _componentValues: number[][] = [];

  /**
   * Creates the new {@link Gradient} instance.
   *
   * @param colors The list of colors that comprise the gradient.
   * @param domain The stop values for each color. Values must be sorted in ascending order.
   */
  public constructor(colors: readonly Color[], domain: readonly number[]) {
    this.colors = colors;
    this.domain = domain;
  }

  /**
   * The cumulative version of all colors used by this gradient.
   *
   * @see {@link Color.version}
   */
  public get version(): number {
    let version = 0;
    for (const color of this.colors) {
      version += color.version;
    }
    return version;
  }

  /**
   * Returns components of the color for value from the domain.
   *
   * **Note:** Don't keep reference to the returned array because it is reused between {@link get} invocations.
   *
   * @param value The domain value.
   * @param model The color model that provides the components for interpolation.
   * @param interpolatorFactory The function that returns an interpolator.
   * @returns The read-only components array.
   */
  public get(model: ColorModel, value: number, interpolatorFactory: InterpolatorFactory): readonly number[] {
    const {colors, domain, _tempComponents, _componentValues, _interpolatorFactory, _interpolators} = this;

    const {componentCount} = model;
    const domainLength = domain.length;

    // Empty gradients are rendered as black
    if (domainLength === 0) {
      if (this._model !== model) {
        model.rgbToComponents(blackRgb, _tempComponents);
      }
      this._model = model;
      return _tempComponents;
    }

    if (domainLength === 1) {
      return this.colors[0].get(model);
    }

    const currVersion = this.version;
    const colorsUpdated = this._prevVersion !== currVersion || this._model !== model;

    // Update color components
    if (colorsUpdated) {
      for (let i = 0; i < domainLength; ++i) {
        const components = colors[i].get(model);

        for (let j = 0; j < componentCount; ++j) {
          _componentValues[j] ||= [];
          _componentValues[j][i] = components[j];
        }
      }
      this._prevVersion = currVersion;
      this._model = model;
    }

    // Create or update interpolators
    if (colorsUpdated) {
      for (let i = 0; i < componentCount; ++i) {
        if (_interpolatorFactory === interpolatorFactory && _interpolators.length > i && _interpolators[i].update) {
          _interpolators[i].update!(domain, _componentValues[i]);
        } else {
          _interpolators[i] = interpolatorFactory(domain, _componentValues[i]);
        }
      }
      this._interpolatorFactory = interpolatorFactory;
    }

    // Interpolate components
    for (let i = 0; i < componentCount; ++i) {
      _tempComponents[i] = clamp1(_interpolators[i](value));
    }

    return _tempComponents;
  }
}
