import {Color} from '@paint-bucket/core';
import {parseCssColor} from './parseCssColor';

declare module '@paint-bucket/core/lib/Color' {


  interface ColorFunction {

    /**
     * Parses color from CSS string.
     */
    (color: string): Color;
  }

  interface Color {

    /**
     * Sets color from CSS string.
     */
    css(color: string): Color;
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
