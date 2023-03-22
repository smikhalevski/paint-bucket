import { Rgb } from '@paint-bucket/core';
import { Applicator } from '@paint-bucket/plugin-utils';

declare module '@paint-bucket/core/lib/Color' {
  interface ColorFunction {
    /**
     * Creates the new color from RGBa components.
     *
     * ```ts
     * color([255, 255, 255, 0.5]);
     *
     * color([, , 255]); // Opaque blue color
     *
     * color(0x00_00_ff);
     * ```
     *
     * @param rgb The 24-bit integer RGBa color or separate components where R, G and B ∈ [0, 255] and a ∈ [0, 1]
     *     (0 = transparent, 1 = opaque). If a R, G or B component is omitted it is set to 0. If alpha component is
     *     omitted it is set to 1.
     * @returns The new color instance.
     */
    (rgb: number | Partial<Rgb>): Color;

    /**
     * Creates the new color from RGBa components.
     *
     * ```ts
     * color.rgb([255, 255, 255, 0.5]);
     *
     * color.rgb([, , 255]); // Opaque blue color
     * ```
     *
     * @param rgb R, G and B ∈ [0, 255] and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a R, G or B component is
     *     omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @returns The new color instance.
     */
    rgb(rgb: Partial<Rgb>): Color;

    /**
     * Creates the new color from RGB components represented as 24-bit integer.
     *
     * ```ts
     * color.rgb24(0xff_ff_ff).rgb() // → [255, 255, 255, 1]
     * ```
     *
     * @param rgb The 24-bit integer, representing color in RGB model (without alpha component).
     * @returns The new color instance.
     */
    rgb24(rgb: number): Color;

    /**
     * Creates the new color from RGBa components represented as 32-bit integer.
     *
     * ```ts
     * color.rgb32(0xaa_bb_cc_dd).rgb() // → [170, 187, 204, 0.86]
     * ```
     *
     * @param rgb The 32-bit integer, representing color in RGBa model (with alpha component).
     * @returns The new color instance.
     */
    rgb32(rgb: number): Color;
  }

  interface Color {
    /**
     * Returns RGBa components as an array where R, G and B ∈ [0, 255] and a ∈ [0, 1] (0 = transparent, 1 = opaque).
     *
     * ```ts
     * color().rgb(); // → [0, 0, 0, 1]
     * ```
     */
    rgb(): Rgb;

    /**
     * Sets RGBa components.
     *
     * ```ts
     * color.rgb([255, 255, 255, 0.5]);
     *
     * color().rgb(([, , B]) => [255, 255, B, 0.5]);
     * ```
     *
     * @param rgb The tuple of R, G and B ∈ [0, 255] and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a R, G or B
     *     component is omitted it is set to 0. If alpha component is omitted it is set to 1.
     */
    rgb(rgb: Applicator<Rgb, Partial<Rgb>>): Color;

    /**
     * Returns 24-bit integer representing RGB components without alpha.
     *
     * ```ts
     * color().rgb24(); // → 0x00_00_00
     * ```
     */
    rgb24(): number;

    /**
     * Sets RGB components from 24-bit integer representation.
     *
     * ```ts
     * color().rgb24(0xff_ff_ff).rgb(); // → [255, 255, 255, 1]
     * ```
     *
     * @param rgb The 24-bit integer, representing color in RGB model.
     */
    rgb24(rgb: Applicator<number>): Color;

    /**
     * Returns 32-bit integer representing RGBa components.
     *
     * ```ts
     * color().rgb32(); // → 0x00_00_00_ff
     * ```
     */
    rgb32(): number;

    /**
     * Sets RGBa components from 32-bit integer representation.
     *
     * ```ts
     * color().rgb32(0xaa_bb_cc_dd).rgb(); // → [170, 187, 204, 0.86]
     * ```
     *
     * @param rgb The 32-bit integer, representing color in RGBa model.
     */
    rgb32(rgb: Applicator<number>): Color;

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
     * color().red(64).red((R) => R * 2).red(); // → 128
     * ```
     *
     * @param R Red ∈ [0, 255].
     */
    red(R: Applicator<number>): Color;

    /**
     * Returns green color component.
     *
     * @returns Green ∈ [0, 255].
     */
    green(): number;

    /**
     * Sets green color component.
     *
     * ```ts
     * color().green(64).green((G) => G * 2).green(); // → 128
     * ```
     * @param G Green ∈ [0, 255].
     */
    green(G: Applicator<number>): Color;

    /**
     * Returns blue color component.
     *
     * @returns Blue ∈ [0, 255].
     */
    blue(): number;

    /**
     * Sets blue color component.
     *
     * ```ts
     * color().blue(64).blue((B) => B * 2).blue(); // → 128
     * ```
     * @param B Blue ∈ [0, 255].
     */
    blue(B: Applicator<number>): Color;

    /**
     * Returns opacity (alpha) component.
     *
     * @returns Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     */
    alpha(): number;

    /**
     * Sets opacity (alpha) component.
     *
     * ```ts
     * color().alpha(0.2).alpha((a) => a * 2).alpha(); // → 0.4
     * ```
     * @param a Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
     */
    alpha(a: Applicator<number>): Color;

    /**
     * Returns the perceived brightness of a color.
     *
     * @returns Brightness ∈ [0, 1].
     * @see {@link http://www.w3.org/TR/AERT#color-contrast Web Content Accessibility Guidelines (Version 1.0)}
     */
    brightness(): number;

    /**
     * The relative brightness.
     *
     * @returns Luminance ∈ [0, 1], 0 = darkest black, 1 = lightest white.
     * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef WCAG20 Relative Luminance}
     */
    luminance(): number;

    /**
     * Returns the color contrast ∈ [1, 21].
     *
     * ```ts
     * color(0x00_00_00).contrast(0xff_ff_ff); // → 21
     * ```
     *
     * @see {@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef WCAG Contrast Ratio}
     */
    contrast(color: ColorLike): number;

    /**
     * Mixes colors in given proportion. Alpha is left unchanged.
     *
     * @param color The color to mix.
     * @param ratio The percentage ∈ [0, 1] of the mix between colors.
     */
    mix(color: ColorLike, ratio: number): Color;

    /**
     * Converts to grayscale using [Highly Sensitive Perceived brightness (HSP)](http://alienryderflex.com/hsp.html)
     * equation. The output color uses the same same color model as the input.
     */
    greyscale(): Color;
  }
}
