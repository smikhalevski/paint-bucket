import {Color} from '@paint-bucket/core';
import {RGB} from '@paint-bucket/rgb';

declare module '@paint-bucket/core/lib/Color' {

  interface Color {

    red(): number;
    red(R: number): this;
    green(): number;
    green(G: number): this;
    blue(): number;
    blue(B: number): this;
    alpha(): number;
    alpha(a: number): this;

    mix():  number;
    readability(): number;
    isReadable(): boolean;
    /**
     * Returns the color brightness in range [0, 1].
     *
     * @see {@link http://www.w3.org/TR/AERT#color-contrast}
     */
    brightness(): number;
    luminance(): number;

    rgbInt(): number;
    rgb(): number

    isDark(): boolean;
    isLight(): boolean;

    lighten(d: number): number;
    brighten(d: number): number;
    darken(d: number): number;
    desaturate(d: number): number;
    saturate(d: number): number;
    greyscale(d: number): number;
    spin(d: number): number;

    analogous(d: number): number;
    complement(d: number): number;
    monochromatic(d: number): number;
    splitComplement(d: number): number;
    triad(d: number): number;
    tetrad(d: number): number;

    hsl(): number;
    hslInt(): number;
  }
}

Color.prototype.isDark = function (this: Color) {
  return this.brightness() < 0.5;
};

Color.prototype.isLight = function (this: Color) {
  return !this.isDark();
};

Color.prototype.brightness = function (this: Color) {
  const {R, G, B} = this.forRead(RGB);

  return (R * 299 + G * 587 + B * 114) / 1000 / 0xFF;
};
