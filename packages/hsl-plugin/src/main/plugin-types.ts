import {Hsl} from '@paint-bucket/hsl';
import {Applicator} from '@paint-bucket/plugin-utils';

declare module '@paint-bucket/core/lib/Color' {

  interface ColorFunction {

    /**
     * Creates the new color from HSLa components.
     *
     * ```ts
     * color.hsl([240, 100, 50]); // Opaque blue color
     *
     * color.hsl([, , 100]); // Opaque white color
     * ```
     *
     * @param hsl H ∈ [0, 360], S and L ∈ [0, 100] and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a H, S or L
     *     component is omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @returns The new color instance.
     */
    hsl(hsl: Partial<Hsl>): Color;

    /**
     * Creates the new color from HSL components represented as 24-bit integer.
     *
     * ```ts
     * color.hsl24(0xFF_FF_FF).hsl() // → [255, 255, 255, 1]
     * ```
     *
     * @param hsl The 24-bit integer, representing color in HSL model (without alpha component).
     * @returns The new color instance.
     */
    hsl24(hsl: number): Color;

    /**
     * Creates the new color from HSLa components represented as 32-bit integer.
     *
     * ```ts
     * color.hsl32(0xAA_BB_CC_DD).hsl();
     * ```
     *
     * @param hsl The 32-bit integer, representing color in HSLa model (with alpha component).
     * @returns The new color instance.
     */
    hsl32(hsl: number): Color;
  }

  interface Color {

    /**
     * Returns HSLa components as an array where H ∈ [0, 360], S and L ∈ [0, 100] and a ∈ [0, 1] (0 = transparent, 1 =
     * opaque).
     *
     * ```ts
     * color().hsl(); // → [0, 0, 0, 1]
     * ```
     */
    hsl(): Hsl;

    /**
     * Sets HSLa components.
     *
     * ```ts
     * color.hsl([360, 0, 0, 0.5]);
     *
     * color().hsl(([, , L]) => [240, 100, L, 0.5]);
     * ```
     *
     * @param hsl The tuple of H ∈ [0, 360], S and L ∈ [0, 100] and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a H, S
     *     or L component is omitted it is set to 0. If alpha component is omitted it is set to 1.
     */
    hsl(hsl: Applicator<Hsl, Partial<Hsl>>): Color;

    /**
     * Returns 24-bit integer representing HSL components without alpha.
     *
     * ```ts
     * color().hsl24(); // → 0x00_00_00
     * ```
     */
    hsl24(): number;

    /**
     * Sets HSL components from 24-bit integer representation.
     *
     * ```ts
     * color().hsl24(0xFF_FF_FF).hsl();
     * ```
     *
     * @param hsl The 24-bit integer, representing color in HSL model.
     */
    hsl24(hsl: Applicator<number>): Color;

    /**
     * Returns 32-bit integer representing HSLa components.
     *
     * ```ts
     * color().hsl32(); // → 0x00_00_00_FF
     * ```
     */
    hsl32(): number;

    /**
     * Sets HSLa components from 32-bit integer representation.
     *
     * ```ts
     * color().hsl32(0xAA_BB_CC_DD).hsl();
     * ```
     *
     * @param hsl The 32-bit integer, representing color in HSLa model.
     */
    hsl32(hsl: Applicator<number>): Color;

    /**
     * Returns hue color component.
     *
     * @returns Hue ∈ [0, 360].
     */
    hue(): number;

    /**
     * Sets hue color component.
     *
     * ```ts
     * color().hue(90).hue((H) => H * 2).hue(); // → 180
     * ```
     *
     * @param H Hue ∈ [0, 360].
     */
    hue(H: Applicator<number>): Color;

    /**
     * Returns saturation color component.
     *
     * @returns Saturation ∈ [0, 100].
     */
    saturation(): number;

    /**
     * Sets saturation color component.
     *
     * ```ts
     * color().saturation(20).saturation((S) => S * 2).saturation(); // → 40
     * ```
     * @param S Saturation ∈ [0, 100].
     */
    saturation(S: Applicator<number>): Color;

    /**
     * Returns lightness color component.
     *
     * @returns Lightness ∈ [0, 100].
     */
    lightness(): number;

    /**
     * Sets lightness color component.
     *
     * ```ts
     * color().lightness(20).lightness((L) => L * 2).lightness(); // → 40
     * ```
     * @param L Lightness ∈ [0, 100].
     */
    lightness(L: Applicator<number>): Color;

    /**
     * Spins hue.
     *
     * ```ts
     * color.spin(45);
     * // or
     * color().hue((H) => H + 45);
     * ```
     *
     * @param H The hue delta ∈ [0, 360] to spin by.
     */
    spin(H: number): Color;

    /**
     * Makes color lighter by the given percentage.
     *
     * ```ts
     * color().lighten(0.2);
     * // or
     * color().lightness((L) => L * 1.2);
     * ```
     *
     * @param p The percentage ∈ [0, 1] by which the lightness must be increased.
     */
    lighten(p: number): Color;

    /**
     * Makes color lighter by the given percentage.
     *
     * ```ts
     * color().darken(0.2);
     * // or
     * color().lightness((L) => L * 0.98);
     * ```
     *
     * @param p The percentage ∈ [0, 1] by which the lightness must be decreased.
     */
    darken(p: number): Color;
  }
}
