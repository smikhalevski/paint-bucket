import {Color} from '@paint-bucket/core';
import {HSL} from '@paint-bucket/hsl';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    analogous(): number[];

    // complement(): number[];
    //
    // monochromatic(): number[];
    //
    // splitComplement(): number[];
    //
    // triad(): number[];
    //
    // tetrad(): number[];
  }
}

Color.prototype.analogous = function (this: Color) {
  return [];
};
