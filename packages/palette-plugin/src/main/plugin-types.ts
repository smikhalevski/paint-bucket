import {Color} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    complement(): Color;

    triad(): Color[];

    tetrad(): Color[];

    splitComplement(): Color[];

    /**
     * @param [n = 6] The number of colors to pick.
     * @param [slices = 30] The number of colors to pick.
     * @return The list of {@link Color} instances.
     */
    analogous(n?: number, slices?: number): Color[];

    /**
     * @param [n = 6] The number of colors to pick.
     * @return The list of {@link Color} instances.
     */
    monochromatic(n?: number): Color[];
  }
}
