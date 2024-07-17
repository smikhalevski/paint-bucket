/**
 * RGBa color model manipulation plugin.
 *
 * @module plugin/rgb
 */
import { Applicator, ColorLike } from '../../core';
import { Color } from '../../Color';
import { RGB } from '../../rgb';
import {
  clamp,
  convertColorInt32ToComponents,
  convertComponentsToColorInt32,
  createAccessor,
  normalizeColorInt,
} from '../../utils';

declare module '../../core' {
  interface ColorLikeSource {
    /**
     * Creates the new color from RGBa components. Components can be represented as a 24-bit integer RGB color, or
     * an array of separate component values where red, green and blue ∈ [0, 255] and alpha ∈ [0, 1] (0 = transparent,
     * 1 = opaque). If the red, green or blue component is omitted it is set to 0. If alpha component is omitted it is
     * set to 1.
     *
     * ```ts
     * clr([255, 255, 255, 0.5]); // Semi-transparent white
     *
     * clr([, , 255]); // Opaque blue color
     *
     * clr(0x00_00_ff);
     * ```
     */
    'paint-bucket/plugin/rgb': number | Partial<RGB>;
  }

  interface Color {
    /**
     * Returns RGBa components as an array where red, green and blue ∈ [0, 255] and alpha ∈ [0, 1] (0 = transparent,
     * 1 = opaque).
     *
     * ```ts
     * clr().rgb();
     * // ⮕ [0, 0, 0, 1]
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    rgb(): RGB;

    /**
     * Sets RGBa components.
     *
     * ```ts
     * clr().rgb(([, , B]) => [255, 255, B, 0.5]);
     * ```
     *
     * @param rgb The tuple of red, green and blue ∈ [0, 255] and alpha ∈ [0, 1] (0 = transparent, 1 = opaque). If red,
     * green or blue component is omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    rgb(rgb: Applicator<RGB, Partial<RGB>>): Color;

    /**
     * Returns 24-bit integer representing RGB components without alpha.
     *
     * ```ts
     * clr().rgb24();
     * // ⮕ 0x00_00_00
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    rgb24(): number;

    /**
     * Sets RGB components from 24-bit integer representation.
     *
     * ```ts
     * clr().rgb24(0xff_ff_ff).rgb();
     * // ⮕ [255, 255, 255, 1]
     * ```
     *
     * @param rgb The 24-bit integer, representing color in RGB model.
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    rgb24(rgb: Applicator<number>): Color;

    /**
     * Returns 32-bit integer representing RGBa components.
     *
     * ```ts
     * clr().rgb32();
     * // ⮕ 0x00_00_00_ff
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    rgb32(): number;

    /**
     * Sets RGBa components from 32-bit integer representation.
     *
     * ```ts
     * clr().rgb32(0xaa_bb_cc_dd).rgb();
     * // ⮕ [170, 187, 204, 0.86]
     * ```
     *
     * @param rgb The 32-bit integer, representing color in RGBa model.
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    rgb32(rgb: Applicator<number>): Color;

    /**
     * Returns red color component.
     *
     * @returns Red ∈ [0, 255].
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    red(): number;

    /**
     * Sets red color component.
     *
     * ```ts
     * clr().red(64).red(r => r * 2).red();
     * // ⮕ 128
     * ```
     *
     * @param r Red ∈ [0, 255].
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    red(r: Applicator<number>): Color;

    /**
     * Returns green color component.
     *
     * @returns Green ∈ [0, 255].
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    green(): number;

    /**
     * Sets green color component.
     *
     * ```ts
     * clr().green(64).green(g => g * 2).green();
     * // ⮕ 128
     * ```
     * @param g Green ∈ [0, 255].
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    green(g: Applicator<number>): Color;

    /**
     * Returns blue color component.
     *
     * @returns Blue ∈ [0, 255].
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    blue(): number;

    /**
     * Sets blue color component.
     *
     * ```ts
     * clr().blue(64).blue(b => b * 2).blue();
     * // ⮕ 128
     * ```
     * @param b Blue ∈ [0, 255].
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    blue(b: Applicator<number>): Color;

    /**
     * Returns opacity (alpha) component.
     *
     * @returns Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    alpha(): number;

    /**
     * Sets opacity (alpha) component.
     *
     * ```ts
     * clr().alpha(0.2).alpha(a => a * 2).alpha();
     * // ⮕ 0.4
     * ```
     * @param a Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    alpha(a: Applicator<number>): Color;

    /**
     * Returns the perceived brightness of a color.
     *
     * @returns Brightness ∈ [0, 1].
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     * @see {@link http://www.w3.org/TR/AERT#color-contrast Web Content Accessibility Guidelines (Version 1.0)}
     */
    brightness(): number;

    /**
     * The relative brightness.
     *
     * @returns Luminance ∈ [0, 1], 0 = darkest black, 1 = lightest white.
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef WCAG20 Relative Luminance}
     */
    luminance(): number;

    /**
     * Returns the color contrast ∈ [1, 21].
     *
     * ```ts
     * clr(0x00_00_00).contrast(0xff_ff_ff);
     * // ⮕ 21
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef WCAG Contrast Ratio}
     */
    contrast(color: ColorLike): number;

    /**
     * Mixes colors in given proportion. Alpha is left unchanged.
     *
     * @param color The color to mix.
     * @param ratio The percentage ∈ [0, 1] of the mix between colors.
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    mix(color: ColorLike, ratio: number): Color;

    /**
     * Converts to grayscale using [Highly Sensitive Perceived brightness (HSP)](http://alienryderflex.com/hsp.html)
     * equation. The output color uses the same color model as the input.
     * @group Plugin Methods
     * @plugin {@link plugin/rgb! plugin/rgb}
     */
    greyscale(): Color;
  }
}

export default function rgbPlugin(ctor: typeof Color): void {
  const nextParse = ctor.parse;

  ctor.parse = value => {
    if (typeof value === 'number') {
      return new ctor().rgb24(value);
    }
    if (Array.isArray(value)) {
      return new ctor().rgb(value);
    }
    return nextParse(value);
  };

  ctor.prototype.rgb = createAccessor<RGB, Partial<RGB>>(
    color => {
      const rgb = color.getComponents(RGB);
      return [rgb[0] * 0xff, rgb[1] * 0xff, rgb[2] * 0xff, rgb[3]];
    },

    (color, value) => {
      const rgb = color.useComponents(RGB);
      const [R, G, B, a] = value;

      if (R !== undefined) {
        rgb[0] = clamp(R / 0xff);
      }
      if (G !== undefined) {
        rgb[1] = clamp(G / 0xff);
      }
      if (B !== undefined) {
        rgb[2] = clamp(B / 0xff);
      }
      if (a !== undefined) {
        rgb[3] = clamp(a);
      }
    }
  );

  ctor.prototype.rgb24 = createAccessor(
    color => convertComponentsToColorInt32(color.getComponents(RGB)) >>> 8,

    (color, value) => {
      convertColorInt32ToComponents(normalizeColorInt(value, 6), color.useComponents(RGB));
    }
  );

  ctor.prototype.rgb32 = createAccessor(
    color => convertComponentsToColorInt32(color.getComponents(RGB)),

    (color, value) => {
      convertColorInt32ToComponents(normalizeColorInt(value, 8), color.useComponents(RGB));
    }
  );

  ctor.prototype.red = createAccessor(
    color => color.getComponents(RGB)[0] * 0xff,

    (color, R) => {
      color.useComponents(RGB)[0] = clamp(R / 0xff);
    }
  );

  ctor.prototype.green = createAccessor(
    color => color.getComponents(RGB)[1] * 0xff,

    (color, G) => {
      color.useComponents(RGB)[1] = clamp(G / 0xff);
    }
  );

  ctor.prototype.blue = createAccessor(
    color => color.getComponents(RGB)[2] * 0xff,

    (color, B) => {
      color.useComponents(RGB)[2] = clamp(B / 0xff);
    }
  );

  ctor.prototype.alpha = createAccessor(
    color => color.getComponents(RGB)[3],

    (color, a) => {
      color.useComponents(RGB)[3] = clamp(a);
    }
  );

  ctor.prototype.brightness = function () {
    const rgb = this.getComponents(RGB);
    return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
  };

  ctor.prototype.luminance = function () {
    const rgb = this.getComponents(RGB);
    return rotate(rgb[0]) * 0.2126 + rotate(rgb[1]) * 0.7152 + rotate(rgb[2]) * 0.0722;
  };

  function rotate(v: number): number {
    return v > 0.03928 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  }

  ctor.prototype.contrast = function (color) {
    let a = this.luminance() + 0.05;
    let b = Color.parse(color).luminance() + 0.05;

    return a > b ? a / b : b / a;
  };

  ctor.prototype.mix = function (color, ratio) {
    const rgb1 = this.useComponents(RGB);
    const rgb2 = Color.parse(color).getComponents(RGB);

    ratio = clamp(ratio);

    rgb1[0] += ratio * (rgb2[0] - rgb1[0]);
    rgb1[1] += ratio * (rgb2[1] - rgb1[1]);
    rgb1[2] += ratio * (rgb2[2] - rgb1[2]);

    return this;
  };

  ctor.prototype.greyscale = function () {
    const rgb = this.useComponents(RGB);
    const [R, G, B] = rgb;
    const value = Math.sqrt(R * R * 0.299 + G * G * 0.587 + B * B * 0.114);

    rgb[0] = value;
    rgb[1] = value;
    rgb[2] = value;

    return this;
  };
}
