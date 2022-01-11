import {Color, Rgb} from '@paint-bucket/core';

const blackRgb: Rgb = [0, 0, 0, 1];

export class Gradient {

  protected colors;
  protected domain;

  private tempComponents: number[] = [0, 0, 0, 1];

  /**
   * Creates the new {@link Gradient} instance.
   *
   * @param colors The list of colors that comprise the gradient.
   * @param domain The stop values for each color.
   */
  public constructor(colors: Color[], domain: number[]) {
    this.colors = colors;
    this.domain = domain;
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
  public get(value: number, model = Rgb): readonly number[] {
    const {colors, domain, tempComponents} = this;

    const domainLength = domain.length;

    if (domainLength === 0) {
      model.rgbToComponents(blackRgb, tempComponents);
      return tempComponents;
    }

    let i = 0;
    while (i < domainLength && domain[i] < value) {
      i++;
    }
    if (i === 0 || domainLength === 1) {
      return colors[0].get(model);
    }
    if (i === domainLength) {
      return colors[domainLength - 1].get(model);
    }

    const ratio = (value - domain[i - 1]) / (domain[i] - domain[i - 1]);

    const components1 = colors[i - 1].get(model);
    const components2 = colors[i].get(model);

    for (let i = 0; i < components1.length; ++i) {
      tempComponents[i] = components1[i] + ratio * (components2[i] - components1[i]);
    }

    return tempComponents;
  }
}
