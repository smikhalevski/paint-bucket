/**
 * CSS color values parsing and serialization plugin.
 *
 * @module paint-bucket/plugin/css
 */

import { Applicator, Color, RGB } from '../../core';
import { createAccessor } from '../../utils';
import { parseColor } from './parseColor';
import { stringifyHex } from './stringifyHex';
import { stringifyHSL } from './stringifyHSL';
import { stringifyRGB } from './stringifyRGB';

declare module '../../core' {
  interface ColorLikeSource {
    /**
     * Parses color from CSS string.
     *
     * ```ts
     * clr('hsl(290, 20%, 50% / 80%)').css();
     * // ⮕ rgba(145,102,153,0.80)
     * ```
     */
    'paint-bucket/plugin/css': string;
  }

  interface Color {
    /**
     * Returns color as an RGBa CSS string, or as a hex string if alpha channel is set to 1.
     *
     * ```ts
     * clr('#abc').css();
     * // ⮕ #aabbcc
     *
     * clr([26, 51, 89, 0.5]).css();
     * // ⮕ rgba(26,51,89,0.50)
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
     * clr().css('hsl(290, 20%, 50% / 80%)').css();
     * // ⮕ rgba(145,102,153,0.80)
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/css!}
     */
    css(color: Applicator<string>): Color;

    /**
     * Returns color as a hex string. This produces a 32-bit hex string if the alpha channel isn't set to 1.
     *
     * ```ts
     * clr([170, 186, 204, 0.87]).cssHex();
     * // ⮕ #aabbccdd
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/css!}
     */
    cssHex(): string;

    /**
     * Returns color as an RGBa CSS string.
     *
     * ```ts
     * clr([26, 51, 89]).cssRGB();
     * // ⮕ rgb(26,51,89)
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/css!}
     */
    cssRGB(): string;

    /**
     * Returns color as an HSLa CSS string.
     *
     * ```ts
     * clr('#abc').cssHSL();
     * // ⮕ hsla(210,25%,73%,0.5)
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/css!}
     */
    cssHSL(): string;
  }
}

export default function cssPlugin(ctor: typeof Color): void {
  const nextParse = ctor.parse;

  ctor.parse = value => (typeof value === 'string' && parseColor(value, new ctor())) || nextParse(value);

  ctor.prototype.css = createAccessor(
    color => (color.getComponents(RGB)[3] === 1 ? stringifyHex(color) : stringifyRGB(color)),

    (color, value) => {
      parseColor(value, color);
    }
  );

  ctor.prototype.cssHex = function () {
    return stringifyHex(this);
  };

  ctor.prototype.cssRGB = function () {
    return stringifyRGB(this);
  };

  ctor.prototype.cssHSL = function () {
    return stringifyHSL(this);
  };

  ctor.prototype.toString = function () {
    return this.css();
  };
}
