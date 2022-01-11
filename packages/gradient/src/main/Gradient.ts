import {Color, Rgb} from '@paint-bucket/core';
import {linearDomain} from './linearDomain';

const blackRgb: Rgb = [0, 0, 0, 1];

const domainCache = new Map<number, number[]>();

for (let i = 0; i < 10; ++i) {
  domainCache.set(i, linearDomain(0, 1, i, []));
}

export class Gradient {

  protected colors;
  protected domain;

  private tempComponents: number[] = [0, 0, 0, 1];

  /**
   * Creates the new {@link Gradient} instance.
   *
   * @param colors The list of colors that comprise the gradient.
   * @param [domain] The stop values for each color.
   */
  public constructor(colors: Color[], domain?: number[]) {
    this.colors = colors;
    this.domain = domain || domainCache.get(colors.length) || linearDomain(0, 1, colors.length, []);
  }

  /**
   * Returns components of the color for value from the domain.
   *
   * **Note:** Don't keep reference to the returned array because it is reused between {@link at} invocations.
   *
   * @param value The domain value.
   * @param [model = Rgb] The color model that provides the components for interpolation.
   * @returns The read-only components array.
   */
  public at(value: number, model = Rgb): readonly number[] {
    const {colors, domain, tempComponents} = this;

    const domainLength = Math.min(colors.length, domain.length);

    if (domainLength === 0) {
      model.rgbToComponents(blackRgb, tempComponents);
      return tempComponents;
    }

    if (domainLength === 1) {
      return colors[0].get(model);
    }

    let d1 = Infinity;
    let d2 = Infinity;

    let i1 = -1;
    let i2 = -1;

    for (let i = 0; i < domainLength; ++i) {
      const v = domain[i];
      const d = Math.abs(v - value);

      if (v <= value && d < d1) {
        d1 = d;
        i1 = i;
      } else if (v > value && d < d2) {
        d2 = d;
        i2 = i;
      }
    }

    if (i1 === -1) {
      return colors[i2].get(model);
    }
    if (i2 === -1) {
      return colors[i1].get(model);
    }

    const ratio = (value - domain[i1]) / (domain[i2] - domain[i1]);

    const c1 = colors[i1].get(model);
    const c2 = colors[i2].get(model);

    for (let i = 0; i < c1.length; ++i) {
      tempComponents[i] = c1[i] + ratio * (c2[i] - c1[i]);
    }

    return tempComponents;
  }
}
