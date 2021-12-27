import {Color, IRgb} from '@paint-bucket/core';
import {copyRgb, createRgb, RGB, rgbToInt} from '@paint-bucket/rgb';
import {lerp} from 'numeric-wrench';
import {getLuminance} from './utils';
import {Wcag2} from './plugin-types';

declare module '@paint-bucket/core/lib/Color' {

  interface IColorFactory {
    (rgb: IRgb): Color;
  }

  interface Color {

    /**
     * Red color component ∈ [0, 255].
     */
    getRed(): number;

    setRed(value: number): this;

    /**
     * Green color component ∈ [0, 255].
     */
    getGreen(): number;

    setGreen(value: number): this;

    /**
     * Blue color component ∈ [0, 255].
     */
    getBlue(): number;

    setBlue(value: number): this;

    /**
     * Alpha channel ∈ [0, 1], 0 = transparent, 1 = opaque.
     */
    getAlpha(): number;

    setAlpha(value: number): this;

    /**
     * Returns the color brightness in range [0, 1].
     *
     * @see {@link http://www.w3.org/TR/AERT#color-contrast}
     */
    getBrightness(): number;

    /**
     * The relative brightness of any point in a colorspace, normalized to 0 for darkest black and 1 for lightest white.
     * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
     */
    getLuminance(): number;

    isDark(): boolean;

    isLight(): boolean;

    isEqual(color: Color, ignoreAlpha?: boolean): boolean;

    /**
     * Analyze the 2 colors and returns the color contrast defined by WCAG Version 2.
     *
     * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef WCAG Version 2}
     */
    readability(color: Color): number;

    /**
     * Returns `true` is foreground and background color combination meet WCAG2 guidelines.
     */
    isReadable(color: Color, wcag2?: Wcag2): boolean;

    /**
     * Mixes colors in given proportion.
     *
     * @param color The color to mix.
     * @param ratio The percentage of blend between colors.
     */
    mix(color: Color, ratio: number): this;

    /**
     * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation. The output color
     * uses the same same color model as the input.
     *
     * @see http://alienryderflex.com/hsp.html
     */
    greyscale(): this;

    toRgb(): IRgb;

    toRgbInt(): number;
  }
}

Color.extendFactory((factory) => (args) => {
  const [rgb] = args;

  if (typeof rgb === 'object' && rgb !== null && typeof rgb.R === 'number' && typeof rgb.G === 'number' && typeof rgb.B === 'number') {
    return Color.create(RGB, createRgb(rgb.R, rgb.G, rgb.B, rgb.a));
  }

  return factory(args);
});

Color.prototype.getRed = function (this: Color) {
  return this.forRead(RGB).R;
};

Color.prototype.setRed = function (this: Color, value) {
  this.forUpdate(RGB).R = value;
  return this;
};

Color.prototype.getGreen = function (this: Color) {
  return this.forRead(RGB).G;
};

Color.prototype.setGreen = function (this: Color, value) {
  this.forUpdate(RGB).G = value;
  return this;
};

Color.prototype.getBlue = function (this: Color) {
  return this.forRead(RGB).B;
};

Color.prototype.setBlue = function (this: Color, value) {
  this.forUpdate(RGB).B = value;
  return this;
};

Color.prototype.getAlpha = function (this: Color) {
  return this.forRead(RGB).B;
};

Color.prototype.setAlpha = function (this: Color, value) {
  this.forUpdate(RGB).B = value;
  return this;
};

Color.prototype.getBrightness = function (this: Color) {
  const {R, G, B} = this.forRead(RGB);

  return (R * 0.299 + G * 0.587 + B * 0.114) / 0xFF;
};

Color.prototype.getLuminance = function (this: Color) {
  return getLuminance(this.forRead(RGB));
};

Color.prototype.isDark = function (this: Color) {
  return this.getBrightness() < 0.5;
};

Color.prototype.isLight = function (this: Color) {
  return !this.isDark();
};

Color.prototype.isEqual = function (this: Color, color, ignoreAlpha) {
  if (this === color) {
    return true;
  }
  const rgb1 = this.forRead(RGB);
  const rgb2 = color.forRead(RGB);

  return rgb1.R === rgb2.R && rgb1.G === rgb2.G && rgb1.B === rgb2.B && (ignoreAlpha || rgb1.a === rgb2.a);
};

Color.prototype.readability = function (this: Color, color) {
  const l1 = this.getLuminance();
  const l2 = color.getLuminance();

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

Color.prototype.isReadable = function (this: Color, color, wcag2 = Wcag2.AA_SMALL) {
  const r = this.readability(color);

  switch (wcag2) {

    case Wcag2.AA_SMALL:
    case Wcag2.AAA_LARGE:
      return r >= 4.5;

    case Wcag2.AA_LARGE:
      return r >= 3;

    case Wcag2.AAA_SMALL:
      return r >= 7;
  }

  return false;
};

Color.prototype.mix = function (this: Color, color, ratio) {
  const rgb1 = this.forUpdate(RGB);
  const rgb2 = color.forUpdate(RGB);

  rgb1.R = lerp(ratio, rgb1.R, rgb2.R);
  rgb1.G = lerp(ratio, rgb1.G, rgb2.G);
  rgb1.B = lerp(ratio, rgb1.B, rgb2.B);
  rgb1.a = lerp(ratio, rgb1.a, rgb2.a);

  return this;
};

Color.prototype.greyscale = function (this: Color) {
  const rgb = this.forUpdate(RGB);
  const {R, G, B} = rgb;

  const q = Math.sqrt(R * R * 0.299 + G * G * 0.587 + B * B * 0.114);

  rgb.R = q;
  rgb.G = q;
  rgb.B = q;

  return this;
};

Color.prototype.toRgb = function (this: Color) {
  return copyRgb(this.forRead(RGB), createRgb());
};

Color.prototype.toRgbInt = function (this: Color) {
  return rgbToInt(this.forRead(RGB));
};
