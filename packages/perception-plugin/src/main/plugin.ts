import {color, Color} from '@paint-bucket/core';
import {deltaE2000} from './deltaE2000';
import {LAB} from '@paint-bucket/lab';
import {areIndistinguishableColors} from './utils';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    getDeltaE2000(color: Color): number;

    isIndistinguishable(color: Color): boolean;
  }
}

Color.prototype.getDeltaE2000 = function (this: Color, color) {
  return deltaE2000(this.fo(LAB), color.forColorSpace(LAB));
};

Color.prototype.isIndistinguishable = function (this: Color, color) {
  return areIndistinguishableColors(this.as(LAB), color.forColorSpace(LAB));
};
