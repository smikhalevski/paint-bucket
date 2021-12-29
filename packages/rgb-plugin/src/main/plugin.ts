import {color, Color, composeComponents, IRgb, normalizeComponents} from '@paint-bucket/core';
import {intToRgb, RGB} from '@paint-bucket/rgb';
import {clamp01, int, right, unNaN} from 'numeric-wrench';

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export type Applicator<T> = T | ((prevValue: T) => T);

declare module '@paint-bucket/core/lib/Color' {

  interface IColorFunction {

    /**
     * Creates the new color from RGBa components.
     *
     * ```ts
     * color.rgb({R: 255, G: 255, B: 255, a: 0.5});
     * ```
     *
     * @param rgb R, G and B ∈ [0, 255] and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a R, G or B component is
     *     omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @returns The new color instance.
     */
    rgb(rgb: Readonly<Partial<IRgb>>): Color;

    /**
     * Creates the new color from RGBa components.
     *
     * ```ts
     * color.rgb(255, 255, 255, 0.5);
     * ```
     *
     * @param R Red ∈ [0, 255].
     * @param G Green ∈ [0, 255].
     * @param B Blue ∈ [0, 255].
     * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     * @returns The new color instance.
     */
    rgb(R: number, G: number, B: number, a?: number): Color;

    /**
     * Creates the new color from RGB components represented as 24-bit integer.
     *
     * ```ts
     * color.rgb24(0xFF_FF_FF, 0.5).toRgb() // → {R: 255, G: 255, B: 255, a: 0.5}
     * ```
     *
     * @param rgb24 24-bit integer, representing color in RGB model.
     * @param [a] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque. If omitted then current alpha component is left
     *     unchanged.
     * @returns The new color instance.
     */
    rgb24(rgb24: number, a?: number): Color;

    /**
     * Creates the new color from RGBa components represented as 32-bit integer.
     *
     * ```ts
     * color.rgb32(0xAA_BB_CC_DD).toRgb() // → {R: 170, G: 187, B: 204, a: 0.86}
     * ```
     *
     * @param rgb32 32-bit integer, representing color in RGBa model.
     */
    rgb32(rgb32: number): Color;
  }

  interface Color {

    /**
     * Returns RGBs components where R, G and B ∈ [0, 255] and a ∈ [0, 1] (0 = transparent, 1 = opaque).
     *
     * ```ts
     * color().toRgb(); // → {R: 0, G: 0, B: 0, a: 1}
     * ```
     */
    toRgb(): IRgb;

    /**
     * Returns 24-bit integer representing RGB components without alpha.
     *
     * ```ts
     * color().toRgb24(); // → 0x00_00_00
     * ```
     */
    toRgb24(): number;

    /**
     * Returns 32-bit integer representing RGBa components.
     *
     * ```ts
     * color().toRgb24(); // → 0x00_00_00_FF
     * ```
     */
    toRgb32(): number;

    /**
     * Sets RGBa components.
     *
     * ```ts
     * color().setRgb({R: 255, G: 255, B: 255, a: 0.5});
     * ```
     *
     * @param rgb R, G and B ∈ [0, 255] and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a R, G or B component is
     *     omitted it is set to 0. If alpha component is omitted it is set to 1.
     */
    setRgb(rgb: Applicator<Readonly<Partial<IRgb>>>): this;

    /**
     * Sets RGBa components.
     *
     * ```ts
     * color().setRgb(255, 255, 255, 0.5);
     * ```
     *
     * @param R Red ∈ [0, 255].
     * @param G Green ∈ [0, 255].
     * @param B Blue ∈ [0, 255].
     * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     */
    setRgb(R: Applicator<number>, G: Applicator<number>, B: Applicator<number>, a?: Applicator<number>): this;

    /**
     * Sets RGB components from 24-bit integer representation.
     *
     * ```ts
     * color().setRgb24(0xFF_FF_FF, 0.5).toRgb() // → {R: 255, G: 255, B: 255, a: 0.5}
     * ```
     *
     * @param rgb24 24-bit integer, representing color in RGB model.
     * @param [a] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque. If omitted then current alpha component is left
     *     unchanged.
     */
    setRgb24(rgb24: Applicator<number>, a?: Applicator<number>): this;

    /**
     * Sets RGBa components from 32-bit integer representation.
     *
     * ```ts
     * color().setRgb32(0xAA_BB_CC_DD).toRgb() // → {R: 170, G: 187, B: 204, a: 0.86}
     * ```
     *
     * @param rgb32 32-bit integer, representing color in RGBa model.
     */
    setRgb32(rgb32: Applicator<number>): this;

    /**
     * Returns red color component.
     *
     * @returns Red ∈ [0, 255].
     */
    getRed(): number;

    /**
     * Sets red color component.
     *
     * ```ts
     * color().setRed(64).setRed((R) => R * 2).getRed(); // → 128
     * ```
     *
     * @param R Red ∈ [0, 255].
     */
    setRed(R: Applicator<number>): this;

    /**
     * Returns green color component.
     *
     * @returns Green ∈ [0, 255].
     */
    getGreen(): number;

    /**
     * Sets green color component.
     *
     * ```ts
     * color().setGreen(64).setGreen((G) => G * 2).getGreen(); // → 128
     * ```
     * @param G Green ∈ [0, 255].
     */
    setGreen(G: Applicator<number>): this;

    /**
     * Returns blue color component.
     *
     * @returns Blue ∈ [0, 255].
     */
    getBlue(): number;

    /**
     * Sets blue color component.
     *
     * ```ts
     * color().setBlue(64).setBlue((B) => B * 2).getBlue(); // → 128
     * ```
     * @param B Blue ∈ [0, 255].
     */
    setBlue(B: Applicator<number>): this;

    /**
     * Sets color alpha channel.
     *
     * @returns Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     */
    getAlpha(): number;

    /**
     * Sets color alpha channel.
     *
     * ```ts
     * color().setAlpha(0.2).setAlpha((a) => a * 2).getAlpha(); // → 0.4
     * ```
     * @param a Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     */
    setAlpha(a: Applicator<number>): this;


    /*
        /!**
         * @returns Brightness ∈ [0, 1].
         * @see {@link http://www.w3.org/TR/AERT#color-contrast}
         *!/
        getBrightness(): number;

        /!**
         * Increase brightness by the absolute value.
         *
         * @param d Additional brightness.
         *!/
        brighten(d: number): this;

        /!**
         * Increase brightness by the percentage of current value.
         *
         * @param p Brightness percentage increase.
         *!/
        brightenBy(p: number): number;

        /!**
         * The relative brightness.
         *
         * @returns Luminance ∈ [0, 1], 0 = darkest black, 1 = lightest white.
         * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef WCAG20 Relative Luminance}
         *!/
        getLuminance(): number;

        /!**
         * Mixes colors in given proportion.
         *
         * @param color The color to mix.
         * @param ratio The percentage of blend between colors.
         *!/
        mix(color: Color, ratio: number): this;

        /!**
         * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation. The output color
         * uses the same same color model as the input.
         *
         * @see http://alienryderflex.com/hsp.html
         *!/
        greyscale(): this;

        /!**
         * Analyze the 2 colors and returns the color contrast defined by WCAG Version 2.
         *
         * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef WCAG Contrast Ratio}
         *!/
        readability(color: Color): number;

        /!**
         * Returns `true` is foreground and background color combination meet WCAG2 guidelines.
         *!/
        isReadable(color: Color, wcag2?: Wcag2): boolean;

        isDark(): boolean;

        isLight(): boolean;

        /!**
         * Returns `true` if 24-bit integer color representations are equal.
         *
         * @param color The color to compare with this color.
         * @param [ignoreAlpha = false] If set to `true` the alpha channel is ignored.
         *!/
        isEqual(color: Color, ignoreAlpha?: boolean): boolean;*/
  }
}


color.rgb = function () {
  const args = arguments;

  return Color.create().setRgb(args[0], args[1], args[2], args[3]);
};

color.rgb24 = (rgb24, a) => Color.create().setRgb24(rgb24, a);

color.rgb32 = (rgb32) => Color.create().setRgb32(rgb32);


const colorPrototype = Color.prototype;

colorPrototype.toRgb = function (this: Color) {
  const rgb = this.getCopy(RGB);

  rgb.R *= 0xFF;
  rgb.G *= 0xFF;
  rgb.B *= 0xFF;

  return rgb;
};

colorPrototype.toRgb24 = function (this: Color) {
  const rgb = this.get(RGB);
  return right(composeComponents(rgb.R * 0xFF, rgb.G * 0xF, rgb.B * 0xFF, 0xFF), 8);
};

colorPrototype.toRgb24 = function (this: Color) {
  const rgb = this.get(RGB);
  return composeComponents(rgb.R * 0xFF, rgb.G * 0xF, rgb.B * 0xFF, rgb.a * 0xFF);
};

colorPrototype.setRgb = function (this: Color) {

  const args = arguments;
  const arg0 = args[0];
  const arg1 = args[1];
  const arg2 = args[2];
  const arg3 = args[3];

  const ref = this.ref();
  const rgb = ref.use(RGB);

  let R, G, B, a;

  if (args.length === 1) {
    const rgb = isFunction(arg0) ? arg0(ref.toRgb()) : arg0;

    if (rgb != null) {
      R = rgb.R;
      G = rgb.G;
      B = rgb.B;
      a = rgb.a;
    }
  } else {
    R = isFunction(arg0) ? arg0(rgb.R) : arg0;
    G = isFunction(arg1) ? arg1(rgb.G) : arg1;
    B = isFunction(arg2) ? arg2(rgb.B) : arg2;
    a = isFunction(arg3) ? arg3(rgb.a) : arg3;
  }

  if (R != null) {
    rgb.R = clamp01(unNaN(R) / 0xFF);
  }
  if (G != null) {
    rgb.G = clamp01(unNaN(G) / 0xFF);
  }
  if (B != null) {
    rgb.B = clamp01(unNaN(B) / 0xFF);
  }
  if (a != null) {
    rgb.a = clamp01(unNaN(a, 1));
  }

  return ref;
};

colorPrototype.setRgb24 = function (this: Color, rgb24, a) {
  const ref = this.ref();
  const rgb = ref.use(RGB);
  const rgbA = rgb.a;

  rgb24 = int(isFunction(rgb24) ? rgb24(this.toRgb24()) : rgb24);

  intToRgb(normalizeComponents(rgb24, 6), rgb);

  a = isFunction(a) ? a(rgbA) : a;

  rgb.a = a != null ? unNaN(a, 1) : rgbA;

  return ref;
};

colorPrototype.setRgb32 = function (this: Color, rgb32) {
  const ref = this.ref();

  rgb32 = int(isFunction(rgb32) ? rgb32(this.toRgb32()) : rgb32);

  intToRgb(normalizeComponents(rgb32, 8), ref.use(RGB));

  return ref;
};

colorPrototype.getRed = function (this: Color) {
  return this.get(RGB).R * 0xFF;
};

colorPrototype.setRed = function (this: Color, R) {
  const ref = this.ref();
  const rgb = ref.use(RGB);

  rgb.R = clamp01(unNaN(isFunction(R) ? R(rgb.R) : R, 1) / 0xFF);

  return ref;
};

colorPrototype.getGreen = function (this: Color) {
  return this.get(RGB).G * 0xFF;
};

colorPrototype.setGreen = function (this: Color, G) {
  const ref = this.ref();
  const rgb = ref.use(RGB);

  rgb.G = clamp01(unNaN(isFunction(G) ? G(rgb.G) : G, 1) / 0xFF);

  return ref;
};

colorPrototype.getBlue = function (this: Color) {
  return this.get(RGB).B * 0xFF;
};

colorPrototype.setBlue = function (this: Color, B) {
  const ref = this.ref();
  const rgb = ref.use(RGB);

  rgb.B = clamp01(unNaN(isFunction(B) ? B(rgb.B) : B, 1) / 0xFF);

  return ref;
};

colorPrototype.getAlpha = function (this: Color) {
  return this.get(RGB).a;
};

colorPrototype.setAlpha = function (this: Color, a) {
  const ref = this.ref();
  const rgb = ref.use(RGB);

  rgb.a = clamp01(unNaN(isFunction(a) ? a(rgb.a) : a, 1));

  return ref;
};

/*

Color.prototype.getBrightness = function (this: Color) {
  const {R, G, B} = this.get(RGB);

  return R * 0.299 + G * 0.587 + B * 0.114;
};

Color.prototype.getLuminance = function (this: Color) {
  return getLuminance(this.get(RGB));
};

Color.prototype.isDark = function (this: Color) {
  return this.getBrightness() < 0.5;
};

Color.prototype.isLight = function (this: Color) {
  return !this.isDark();
};

Color.prototype.isEqual = function (this: Color, color, ignoreAlpha = false) {
  if (this === color) {
    return true;
  }

  const rgb1 = rgbToInt(this.get(RGB));
  const rgb2 = rgbToInt(color.get(RGB));

  return rgb1 === rgb2 || (ignoreAlpha && right(rgb1, 8) === right(rgb2, 8));
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
  const rgb1 = this.use(RGB);
  const rgb2 = color.use(RGB);

  rgb1.R = lerp(ratio, rgb1.R, rgb2.R);
  rgb1.G = lerp(ratio, rgb1.G, rgb2.G);
  rgb1.B = lerp(ratio, rgb1.B, rgb2.B);
  rgb1.a = lerp(ratio, rgb1.a, rgb2.a);

  return this;
};

Color.prototype.greyscale = function (this: Color) {
  const rgb = this.use(RGB);
  const {R, G, B} = rgb;

  const q = Math.sqrt(R * R * 0.299 + G * G * 0.587 + B * B * 0.114);

  rgb.R = q;
  rgb.G = q;
  rgb.B = q;

  return this;
};

Color.prototype.toRgb = function (this: Color) {
  return copyRgb(this.get(RGB), createRgb());
};

Color.prototype.toRgbInt = function (this: Color) {
  return rgbToInt(this.get(RGB));
};
*/
