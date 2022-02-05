import {ColorModel, Rgb} from './color-model';
import {Color} from './Color';

// Black RGBa color that is returned if gradient has zero domain size
const blackRgb: Rgb = [0, 0, 0, 1];

export type Interpolator = (x: number) => number;

export type InterpolatorFactory = (xs: ArrayLike<number>, ys: ArrayLike<number>) => Interpolator;

export class Gradient {

  protected colors;
  protected domain;

  private _tempComponents: number[] = [0, 0, 0, 1];
  private _prevVersion?: number;
  private _model?: ColorModel;
  private _interpolatorFactory?: InterpolatorFactory;
  private _interpolators: Interpolator[] = [];
  private _componentValues: Float32Array[] = [];

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
    const {colors, domain, _tempComponents, _componentValues, _interpolators} = this;

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

    // Check if component interpolators must be re-created
    if (this._prevVersion !== currVersion || this._model !== model || this._interpolatorFactory !== interpolatorFactory) {

      this._prevVersion = currVersion;
      this._model = model;
      this._interpolatorFactory = interpolatorFactory;

      for (let i = 0; i < domainLength; ++i) {
        const components = colors[i].get(model);

        for (let j = 0; j < components.length; ++j) {
          _componentValues[j] ||= new Float32Array(domainLength);
          _componentValues[j][i] = components[j];
        }
      }

      // Create interpolators
      for (let i = 0; i < _componentValues.length; ++i) {
        _interpolators[i] = interpolatorFactory(domain, _componentValues[i]);
      }
    }

    // Interpolate components
    for (let i = 0; i < _interpolators.length; ++i) {
      _tempComponents[i] = _interpolators[i](value);
    }

    return _tempComponents;
  }
}
