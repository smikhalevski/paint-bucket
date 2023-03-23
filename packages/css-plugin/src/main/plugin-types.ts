import { Applicator } from '@paint-bucket/plugin-utils';

declare module '@paint-bucket/core' {
  interface InjectColorLike {
    /**
     * Parses color from CSS string.
     *
     * ```ts
     * Color.parse('hsl(290, 20%, 50% / 80%)').css(); // rgba(145,102,153,0.80)
     * ```
     */
    '@paint-bucket/css-plugin': string;
  }

  interface Color {
    /**
     * Returns color as a CSS string.
     *
     * ```ts
     * Color.parse('#abc').css(); // #aabbcc
     *
     * Color.parse([26, 51, 89, 0.5]).css(); // rgba(26,51,89,0.50)
     * ```
     */
    css(): string;

    /**
     * Sets color from CSS string.
     *
     * ```ts
     * new Color().css('hsl(290, 20%, 50% / 80%)').css(); // rgba(145,102,153,0.80)
     * ```
     */
    css(color: Applicator<string>): Color;
  }
}
