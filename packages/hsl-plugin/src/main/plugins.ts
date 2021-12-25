import {PaintBucket} from '@paint-bucket/core';
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

PaintBucket.prototype.lighten = function (this: PaintBucket, delta) {
  adjustLightness(this.forColorSpace(HSL), delta);
  return this;
};

PaintBucket.prototype.lightenBy = function (this: PaintBucket, percent) {
  adjustLightnessBy(this.forColorSpace(HSL), percent);
  return this;
};

PaintBucket.prototype.darken = function (this: PaintBucket, delta) {
  adjustLightness(this.forColorSpace(HSL), -delta);
  return this;
};

PaintBucket.prototype.darkenBy = function (this: PaintBucket, percent) {
  adjustLightnessBy(this.forColorSpace(HSL), -percent);
  return this;
};
