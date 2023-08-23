/**
 * Gradient manipulation plugin.
 *
 * ```ts
 * import { Color } from 'paint-bucket';
 *
 * Color.gradient(['#fff', '#000']).at(0.7).css(); // ⮕ #4d4d4d
 *
 * Color.gradient(['#fff', '#000'], [0, 100]).at(70).css(); // ⮕ #4d4d4d
 *
 * Color.parse('#fff').gradient('#000').at(0.7).css(); // ⮕ #4d4d4d
 * ```
 *
 * @module paint-bucket/plugin/gradient
 */

import { lerp, range, sort, swap } from 'algomatic';
import { Color, ColorLike, ColorModel, Gradient, InterpolatorFactory, RGB } from '../../core';

declare module '../../core' {
  namespace Color {
    /**
     * Creates the new {@link Gradient} of colors.
     *
     * @param colors The list of colors used for the gradient.
     * @param domain The list of color position in the gradient.
     * @return The new {@link Gradient} instance.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/gradient!}
     */
    function gradient(colors: ColorLike[], domain?: number[]): Gradient;
  }

  interface Color {
    /**
     * Creates the new linear {@link Gradient} of colors on [0, 1] domain.
     *
     * @param color The color stop at 1.
     * @return The new {@link Gradient} instance.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/gradient!}
     */
    gradient(color: ColorLike): Gradient;
  }

  interface Gradient {
    /**
     * Returns the color at the given position in the gradient.
     *
     * @param x The value from the gradient domain for which the color is requested.
     * @param [model = RGB] The color model that should be used for interpolation.
     * @param [interpolatorFactory = lerp] The function that returns a color component interpolator.
     * @return The new {@link Color} instance.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/gradient!}
     *
     * @see {@link https://smikhalevski.github.io/algomatic/modules.html#lerp lerp}
     * @see {@link https://smikhalevski.github.io/algomatic/modules.html#csplineMonot csplineMonot}
     */
    at(x: number, model?: ColorModel, interpolatorFactory?: InterpolatorFactory): Color;

    /**
     * Returns the list of equally spaced colors from the gradient.
     *
     * @param n The number of colors to pick.
     * @param [model = RGB] The color model that should be used for interpolation.
     * @return The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/gradient!}
     */
    palette(n: number, model?: ColorModel): Color[];
  }
}

export default function (colorConstructor: typeof Color, gradientConstructor: typeof Gradient): void {
  colorConstructor.gradient = (colors, domain) => {
    if (domain) {
      if (colors.length > domain.length) {
        colors = colors.slice(0, domain.length);
      }
      domain = domain.slice(0, colors.length);
    } else {
      domain = range(colors.length);
    }

    colors = colors.map(Color.parse);

    sort(domain, (i, j) => {
      swap(colors, i, j);
    });

    return new Gradient(colors as Color[], domain);
  };

  colorConstructor.prototype.gradient = function (color) {
    return new gradientConstructor([this, Color.parse(color)], [0, 1]);
  };

  gradientConstructor.prototype.at = function (x, model = RGB, interpolatorFactory = lerp) {
    return new colorConstructor(model, this.getComponents(model, x, interpolatorFactory).slice(0));
  };

  gradientConstructor.prototype.palette = function (n, model = RGB) {
    const { domain } = this;

    const colors = [];

    const x0 = domain[0];
    const dx = domain[domain.length - 1] - x0;

    for (let i = 0; i < n; ++i) {
      colors.push(this.at(x0 + (i / (n - 1)) * dx, model));
    }
    return colors;
  };
}
