import {Color} from '@paint-bucket/core';
import {HSL} from '@paint-bucket/hsl';
import {adjustLightness, adjustLightnessBy} from './utils';

declare module '@paint-bucket/core/lib/PaintBucket' {

  interface PaintBucket {

    lighten(delta: number): this;

    lightenBy(percent: number): this;

    darken(delta: number): this;

    darkenBy(percent: number): this;
  }
}

Color.prototype.lighten = function (this: Color, delta) {
  adjustLightness(this.as(HSL), delta);
  return this;
};

Color.prototype.lightenBy = function (this: Color, percent) {
  adjustLightnessBy(this.as(HSL), percent);
  return this;
};

Color.prototype.darken = function (this: Color, delta) {
  adjustLightness(this.as(HSL), -delta);
  return this;
};

Color.prototype.darkenBy = function (this: Color, percent) {
  adjustLightnessBy(this.as(HSL), -percent);
  return this;
};
