import { Hsl } from '@paint-bucket/hsl';
import { Applicator } from '@paint-bucket/plugin-utils';

declare module '@paint-bucket/core/lib/Color' {
  namespace Color {
    /**
     * Creates the new color from HSLa components.
     *
     * ```ts
     * Color.hsl([240, 100, 50]); // Opaque blue color
     *
     * Color.hsl([, , 100]); // Opaque white color
     * ```
     *
     * @param hsl H ∈ [0, 360], S and L ∈ [0, 100] and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a H, S or L
     *     component is omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @returns The new color instance.
     */
    export function hsl(hsl: Partial<Hsl>): Color;

    /**
     * Creates the new color from HSL components represented as 24-bit integer.
     *
     * ```ts
     * Color.hsl24(0xff_ff_ff).hsl() // → [255, 255, 255, 1]
     * ```
     *
     * @param hsl The 24-bit integer, representing color in HSL model (without alpha component).
     * @returns The new color instance.
     */
    export function hsl24(hsl: number): Color;

    /**
     * Creates the new color from HSLa components represented as 32-bit integer.
     *
     * ```ts
     * Color.hsl32(0xaa_bb_cc_dd).hsl();
     * ```
     *
     * @param hsl The 32-bit integer, representing color in HSLa model (with alpha component).
     * @returns The new color instance.
     */
    export function hsl32(hsl: number): Color;
  }

  interface Color {
    /**
     * Returns HSLa components as an array where H ∈ [0, 360], S and L ∈ [0, 100] and a ∈ [0, 1] (0 = transparent, 1 =
     * opaque).
     *
     * ```ts
     * new Color().hsl(); // → [0, 0, 0, 1]
     * ```
     */
    hsl(): Hsl;

    /**
     * Sets HSLa components.
     *
     * ```ts
     * Color.hsl([360, 0, 0, 0.5]);
     *
     * new Color().hsl(([, , L]) => [240, 100, L, 0.5]);
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
     * new Color().hsl24(); // → 0x00_00_00
     * ```
     */
    hsl24(): number;

    /**
     * Sets HSL components from 24-bit integer representation.
     *
     * ```ts
     * new Color().hsl24(0xff_ff_ff).hsl();
     * ```
     *
     * @param hsl The 24-bit integer, representing color in HSL model.
     */
    hsl24(hsl: Applicator<number>): Color;

    /**
     * Returns 32-bit integer representing HSLa components.
     *
     * ```ts
     * new Color().hsl32(); // → 0x00_00_00_ff
     * ```
     */
    hsl32(): number;

    /**
     * Sets HSLa components from 32-bit integer representation.
     *
     * ```ts
     * new Color().hsl32(0xaa_bb_cc_dd).hsl();
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
     * new Color().hue(90).hue((H) => H * 2).hue(); // → 180
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
     * new Color().saturation(20).saturation((S) => S * 2).saturation(); // → 40
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
     * new Color().lightness(20).lightness((L) => L * 2).lightness(); // → 40
     * ```
     * @param L Lightness ∈ [0, 100].
     */
    lightness(L: Applicator<number>): Color;

    /**
     * Spins hue.
     *
     * ```ts
     * Color.spin(45);
     * // or
     * new Color().hue((H) => H + 45);
     * ```
     *
     * @param H The hue delta ∈ [0, 360] to spin by.
     */
    spin(H: number): Color;

    /**
     * Makes color lighter by the given percentage.
     *
     * ```ts
     * new Color().lighten(0.2);
     * // or
     * new Color().lightness((L) => L * 1.2);
     * ```
     *
     * @param p The percentage ∈ [0, 1] by which the lightness must be increased.
     */
    lighten(p: number): Color;

    /**
     * Makes color lighter by the given percentage.
     *
     * ```ts
     * new Color().darken(0.2);
     * // or
     * new Color().lightness((L) => L * 0.98);
     * ```
     *
     * @param p The percentage ∈ [0, 1] by which the lightness must be decreased.
     */
    darken(p: number): Color;
  }
}
