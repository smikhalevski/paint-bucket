import {Color} from '@paint-bucket/core';
import {Applicator} from '@paint-bucket/plugin-utils';

declare module '@paint-bucket/core/lib/Color' {

  interface ColorFunction {

    /**
     * Parses color from CSS string.
     *
     * ```ts
     * color('hsl(290, 20%, 50% / 80%)').css(); // rgba(145,102,153,0.80)
     * ```
     */
    (color: string): Color;
  }

  interface Color {

    /**
     * Returns color as a CSS string.
     *
     * ```ts
     * color('#abc').css(); // #aabbcc
     *
     * color([26, 51, 89, 0.5]).css(); // rgba(26,51,89,0.50)
     * ```
     */
    css(): string;

    /**
     * Sets color from CSS string.
     *
     * ```ts
     * color().css('hsl(290, 20%, 50% / 80%)').css(); // rgba(145,102,153,0.80)
     * ```
     */
    css(color: Applicator<string>): Color;
  }
}
