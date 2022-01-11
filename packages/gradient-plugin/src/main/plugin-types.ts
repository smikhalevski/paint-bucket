import {Color, ColorLike, ColorModel} from '@paint-bucket/core';
import {Gradient} from '@paint-bucket/gradient';

declare module '@paint-bucket/core/lib/Color' {

  interface ColorFunction {

    /**
     * Creates the new {@link Gradient} of colors.
     *
     * @param colors The list of colors used for the gradient.
     * @param domain The list of color position in the gradient.
     * @return The new {@link Gradient} instance.
     */
    gradient(colors: ColorLike[], domain?: number[]): Gradient;
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

declare module '@paint-bucket/gradient/lib/Gradient' {

  interface Gradient {

    /**
     * Returns the color at the given position in the gradient.
     *
     * @param x The value from the gradient domain for which the color is requested.
     * @param [model = Rgb] The color model that should be used for interpolation.
     * @return The new {@link Color} instance.
     */
    at(x: number, model?: ColorModel): Color;

    /**
     * Returns the list of equally spaced colors from the gradient.
     *
     * @param n The number of colors to pick.
     * @param [model = Rgb] The color model that should be used for interpolation.
     * @return The list of {@link Color} instances.
     */
    palette(n: number, model?: ColorModel): Color[];
  }
}
