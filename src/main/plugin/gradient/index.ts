/**
 * Gradient manipulation plugin.
 *
 * @module paint-bucket/plugin/gradient
 */

import { Color, ColorModel, Gradient } from '../../core';

declare module '../../core' {
  interface Gradient {
    /**
     * Returns the list of equally spaced colors from the gradient.
     *
     * @param n The number of colors to pick.
     * @param [model = RGB] The color model that should be used for interpolation.
     * @returns The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/gradient!}
     */
    palette(n: number, model?: ColorModel): Color[];
  }
}

export default function (ctor: typeof Color, gradientConstructor: typeof Gradient): void {
  // gradientConstructor.prototype.palette = function (n, model = RGB) {
  //   const { _domain } = this;
  //
  //   const colors = [];
  //
  //   const x0 = _domain[0];
  //   const dx = _domain[_domain.length - 1] - x0;
  //
  //   for (let i = 0; i < n; ++i) {
  //     colors.push(this.at(x0 + (i / (n - 1)) * dx, model));
  //   }
  //   return colors;
  // };
}
