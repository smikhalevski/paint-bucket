import {Applicator, IRgb} from '@paint-bucket/core';

declare module '@paint-bucket/core/lib/Color' {

  interface IColorFunction {

    /**
     * Creates the new color from RGBa components.
     *
     * ```ts
     * color.fromRgb({R: 255, G: 255, B: 255, a: 0.5});
     * ```
     *
     * @param rgb R, G and B ∈ [0, 255] and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a R, G or B component is
     *     omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @returns The new color instance.
     */
    fromRgb(rgb: Readonly<Partial<IRgb>>): Color;

    /**
     * Creates the new color from RGBa components.
     *
     * ```ts
     * color.fromRgb(255, 255, 255, 0.5);
     * ```
     *
     * @param R Red ∈ [0, 255].
     * @param G Green ∈ [0, 255].
     * @param B Blue ∈ [0, 255].
     * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     * @returns The new color instance.
     */
    fromRgb(R: number, G: number, B: number, a?: number): Color;

    /**
     * Creates the new color from RGB components represented as 24-bit integer.
     *
     * ```ts
     * color.fromRgb24(0xFF_FF_FF, 0.5).toRgb() // → {R: 255, G: 255, B: 255, a: 0.5}
     * ```
     *
     * @param rgb24 24-bit integer, representing color in RGB model.
     * @param [a] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque. If omitted then current alpha component is left
     *     unchanged.
     * @returns The new color instance.
     */
    fromRgb24(rgb24: number, a?: number): Color;

    /**
     * Creates the new color from RGBa components represented as 32-bit integer.
     *
     * ```ts
     * color.fromRgb32(0xAA_BB_CC_DD).toRgb() // → {R: 170, G: 187, B: 204, a: 0.86}
     * ```
     *
     * @param rgb32 32-bit integer, representing color in RGBa model.
     */
    fromRgb32(rgb32: number): Color;
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
    red(): number;

    /**
     * Sets red color component.
     *
     * ```ts
     * color().setRed(64).setRed((R) => R * 2).getRed(); // → 128
     * ```
     *
     * @param R Red ∈ [0, 255].
     */
    red(R: Applicator<number>): this;

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
     * Returns opacity (alpha) component.
     *
     * @returns Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     */
    getAlpha(): number;

    /**
     * Sets opacity (alpha) component.
     *
     * ```ts
     * color().setAlpha(0.2).setAlpha((a) => a * 2).getAlpha(); // → 0.4
     * ```
     * @param a Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     */
    setAlpha(a: Applicator<number>): this;

    /**
     * Returns the perceived brightness of a color.
     *
     * @returns Brightness ∈ [0, 255].
     * @see {@link http://www.w3.org/TR/AERT#color-contrast Web Content Accessibility Guidelines (Version 1.0)}
     */
    getBrightness(): number;

    /**
     * Sets the perceived brightness of a color.
     *
     * @param b Brightness ∈ [0, 1].
     */
    setBrightness(b: Applicator<number>): this;

    /**
     * The relative brightness.
     *
     * @returns Luminance ∈ [0, 1], 0 = darkest black, 1 = lightest white.
     * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef WCAG20 Relative Luminance}
     */
    getLuminance(): number;

    /**
     * Returns the color contrast.
     *
     * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef WCAG Contrast Ratio}
     */
    getContrast(color: Color): number;

    /**
     * Mixes colors in given proportion.
     *
     * @param color The color to mix.
     * @param ratio The percentage ∈ [0, 1] of the mix between colors.
     */
    mix(color: Color, ratio: number): this;

    /**
     * Converts any color to grayscale using Highly Sensitive Perceived brightness (HSP) equation. The output color
     * uses the same same color model as the input.
     *
     * @see http://alienryderflex.com/hsp.html
     */
    greyscale(): this;
  }
}
