import {Color, ColorModel} from '@paint-bucket/core';
import {linearDomain} from './linearDomain';

export class Gradient {

  protected colors: Color[];
  protected domain: number[];

  private tempComponents: number[] = [0, 0, 0, 1];

  public constructor(colors: Color[], domain = linearDomain(0, 1, colors.length, [])) {
    this.colors = colors;
    this.domain = domain;
  }

  public getAt(model: ColorModel, value: number): readonly number[] {
    const {colors, domain, tempComponents} = this;

    if (colors.length === 0 || domain.length !== colors.length) {
      throw new Error();
    }
    if (colors.length === 1) {
      return colors[0].get(model);
    }

    let d1 = Infinity;
    let d2 = Infinity;

    let i1 = -1;
    let i2 = -1;

    for (let i = 0; i < domain.length; ++i) {
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

    const v = (value - domain[i1]) / (domain[i2] - domain[i1]);

    const components1 = colors[i1].get(model);
    const components2 = colors[i2].get(model);

    for (let i = 0; i < components1.length; ++i) {
      tempComponents[i] = components1[i] + v * (components2[i] - components1[i]);
    }

    return tempComponents;
  }
}
