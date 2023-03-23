import { Color, ColorLike, ColorModel, Gradient, InterpolatorFactory } from '@paint-bucket/core';

declare module '@paint-bucket/core' {
  namespace Color {
    /**
     * Creates the new {@link Gradient} of colors.
     *
     * @param colors The list of colors used for the gradient.
     * @param domain The list of color position in the gradient.
     * @return The new {@link Gradient} instance.
     */
    export function gradient(colors: ColorLike[], domain?: number[]): Gradient;
  }

  interface Color {
    /**
     * Creates the new linear {@link Gradient} of colors on [0, 1] domain.
     *
     * @param color The color stop at 1.
     * @return The new {@link Gradient} instance.
     */
    gradient(color: ColorLike): Gradient;
  }
}

declare module '@paint-bucket/core/lib/Gradient' {
  interface Gradient {
    /**
     * Returns the color at the given position in the gradient.
     *
     * @param x The value from the gradient domain for which the color is requested.
     * @param [model = RGB] The color model that should be used for interpolation.
     * @param [interpolatorFactory = lerp] The function that returns a color component interpolator.
     * @return The new {@link Color} instance.
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
     */
    palette(n: number, model?: ColorModel): Color[];
  }
}
