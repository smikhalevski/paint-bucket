/**
 * CSS color values parsing and serialization plugin.
 *
 * @module paint-bucket/plugin/css
 */

import { HSL } from '../../color-model/hsl';
import { Applicator, Color, RGB } from '../../core';
import { createAccessor } from '../../utils';
import { parseColor } from './parseColor';
import { stringifyColor } from './stringifyColor';

declare module '../../core' {
  interface ColorLikeSource {
    /**
     * Parses color from CSS string.
     *
     * ```ts
     * Color.parse('hsl(290, 20%, 50% / 80%)').css(); // rgba(145,102,153,0.80)
     * ```
     */
    'paint-bucket/plugin/css': string;
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
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/css!}
     */
    css(): string;

    /**
     * Sets color from CSS string.
     *
     * ```ts
     * new Color().css('hsl(290, 20%, 50% / 80%)').css(); // rgba(145,102,153,0.80)
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/css!}
     */
    css(color: Applicator<string>): Color;

    /**
     * Returns color as an HSLa CSS string.
     *
     * ```ts
     * Color.parse('#abc').cssHSL(); // hsla(210,25%,73%,0.5)
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/css!}
     */
    cssHSL(): string;
  }
}

export default function (colorConstructor: typeof Color): void {
  const parse = colorConstructor.parse;

  colorConstructor.parse = value => (typeof value === 'string' && parseColor(value, new Color())) || parse(value);

  colorConstructor.prototype.css = createAccessor(
    color => stringifyColor(color, RGB),

    (color, value) => {
      parseColor(value, color);
    }
  );

  colorConstructor.prototype.cssHSL = function () {
    return stringifyColor(this, HSL);
  };

  colorConstructor.prototype.toString = function () {
    return this.css();
  };
}
