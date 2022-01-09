import {Color, Rgb} from '@paint-bucket/core';
import {parseCssColor} from './parseCssColor';
import {Applicator, createAccessor} from '@paint-bucket/plugin-utils';
import {stringifyRgb} from './stringifyRgb';

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

Color.overrideParser((next) => (value) => {
  if (typeof value === 'string') {
    const color = parseCssColor(value);

    if (color) {
      return color;
    }
  }
  return next(value);
});

const colorPrototype = Color.prototype;

colorPrototype.css = createAccessor(
    function (this: Color) {
      return stringifyRgb(this.get(Rgb));
    },
    function (this: Color, value) {
      const color = parseCssColor(value);
      if (color) {
        this.model = color.model;
        this.components = color.components;
      } else {
        this.model = Rgb;
        this.components = [0, 0, 0, 1];
      }
      return this;
    },
);
