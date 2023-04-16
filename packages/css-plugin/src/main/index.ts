import { Color, ColorConstructor, RGB } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';
import { Applicator, createAccessor, enhanceParse } from '@paint-bucket/plugin-utils';
import { parseColor } from './parseColor';
import { stringifyColor } from './stringifyColor';

declare module '@paint-bucket/core' {
  interface ColorLikeSource {
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
     * Returns color as a hex or RGBa CSS string.
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

    /**
     * Returns color as an HSLa CSS string.
     *
     * ```ts
     * Color.parse('#abc').cssHSL(); // hsla(210,25%,73%,0.5)
     * ```
     */
    cssHSL(): string;
  }
}

export default function (Color: ColorConstructor): void {
  enhanceParse(Color, parse => value => {
    return (typeof value === 'string' && parseColor(value)) || parse(value);
  });

  Color.prototype.css = createAccessor(
    color => stringifyColor(color, RGB),

    (color, value) => {
      parseColor(value, color);
    }
  );

  Color.prototype.cssHSL = function () {
    return stringifyColor(this, HSL);
  };

  Color.prototype.toString = function () {
    return this.css();
  };
}
