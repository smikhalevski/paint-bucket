import {Color, IRgb} from '@paint-bucket/core';
import {parseCssColor} from './parseCssColor';

declare module '@paint-bucket/core/lib/Color' {


  interface IColorFactory {

    /**
     * Parses color from CSS string.
     */
    (color: string): Color;
  }

  // interface Color {
  //
  //   /**
  //    * Parses color from CSS string.
  //    */
  //   setCss(color: string): this;
  // }
}

Color.extendFactory((factory) => (args) => {
  const [input] = args;

  if (typeof input === 'string') {
    const color = parseCssColor(input);
    if (color) {
      return color;
    }
  }

  return factory(args);
});
