import {Color} from '@paint-bucket/core';
import {copyHsl, createHsl, HSL, IHsl} from '@paint-bucket/hsl';
import {adjustLightness, adjustLightnessBy} from './utils';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    lighten(delta: number): this;

    lightenBy(percent: number): this;

    darken(delta: number): this;

    darkenBy(percent: number): this;

    toHsl(): IHsl;

    // desaturate(delta: number): number;
    //
    // desaturateBy(percent: number): number;
    //
    // saturate(delta: number): number;
    //
    // saturateBy(percent: number): number;
    //
    // spin(d: number): number;
  }
}

Color.prototype.lighten = function (this: Color, delta) {
  adjustLightness(this.forUpdate(HSL), delta);
  return this;
};

Color.prototype.lightenBy = function (this: Color, percent) {
  adjustLightnessBy(this.forUpdate(HSL), percent);
  return this;
};

Color.prototype.darken = function (this: Color, delta) {
  adjustLightness(this.forUpdate(HSL), -delta);
  return this;
};

Color.prototype.darkenBy = function (this: Color, percent) {
  adjustLightnessBy(this.forUpdate(HSL), -percent);
  return this;
};

Color.prototype.toHsl = function (this: Color) {
  return copyHsl(this.forRead(HSL), createHsl());
};
