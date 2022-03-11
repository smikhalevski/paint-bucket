import {Color} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    /**
     * Returns a new complement color.
     */
    complement(): Color;

    /**
     * Returns three complement colors.
     *
     * @return The list of {@link Color} instances.
     */
    triad(): Color[];

    /**
     * Returns four complement colors.
     *
     * @return The list of {@link Color} instances.
     */
    tetrad(): Color[];

    /**
     * Returns three complement colors.
     *
     * @return The list of {@link Color} instances.
     */
    splitComplement(): Color[];

    /**
     * Returns the list of analogous colors.
     *
     * @param [n = 6] The number of colors to pick.
     * @param [slices = 30] The number of colors to pick.
     * @return The list of {@link Color} instances.
     */
    analogous(n?: number, slices?: number): Color[];

    /**
     * Returns the list of monochromatic colors.
     *
     * @param [n = 6] The number of colors to pick.
     * @return The list of {@link Color} instances.
     */
    monochromatic(n?: number): Color[];
  }
}
