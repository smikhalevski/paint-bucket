import {Color} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  interface IColorFunction {

    random(): Color;
  }

  interface Color {

    analogous(): number[];

    complement(): number[];

    monochromatic(): number[];

    splitComplement(): number[];

    triad(): number[];

    tetrad(): number[];
  }
}

const colorPrototype = Color.prototype;

colorPrototype.analogous = function (this: Color) {
  return [];
};
