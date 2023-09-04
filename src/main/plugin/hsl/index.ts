/**
 * HSLa color model manipulation plugin.
 *
 * @module paint-bucket/plugin/hsl
 */

import { HSL } from '../../color-model/hsl';
import { Applicator, Color } from '../../core';
import {
  clamp,
  convertColorInt32ToComponents,
  convertComponentsToColorInt32,
  createAccessor,
  normalizeColorInt,
} from '../../utils';

declare module '../../core' {
  interface Color {
    /**
     * Returns HSLa components as an array where hue ∈ [0, 360], saturation and lightness ∈ [0, 100] and alpha ∈ [0, 1]
     * (0 = transparent, 1 = opaque).
     *
     * ```ts
     * clr().hsl();
     * // ⮕ [0, 0, 0, 1]
     * ```
     *
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    hsl(): HSL;

    /**
     * Sets HSLa components.
     *
     * ```ts
     * clr().hsl(([, , l]) => [240, 100, l, 0.5]);
     * ```
     *
     * @param hsl The tuple of hue ∈ [0, 360], saturation and lightness ∈ [0, 100] and alpha ∈ [0, 1] (0 = transparent,
     * 1 = opaque). If a hue, saturation or lightness component is omitted it is set to 0. If alpha component is omitted
     * it is set to 1.
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    hsl(hsl: Applicator<HSL, Partial<HSL>>): Color;

    /**
     * Returns 24-bit integer representing HSL components without alpha.
     *
     * ```ts
     * clr().hsl24();
     * // ⮕ 0x00_00_00
     * ```
     *
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    hsl24(): number;

    /**
     * Sets HSL components from 24-bit integer representation.
     *
     * ```ts
     * clr().hsl24(0xff_ff_ff).hsl();
     * ```
     *
     * @param hsl The 24-bit integer, representing color in HSL model.
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    hsl24(hsl: Applicator<number>): Color;

    /**
     * Returns 32-bit integer representing HSLa components.
     *
     * ```ts
     * clr().hsl32();
     * // ⮕ 0x00_00_00_ff
     * ```
     *
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    hsl32(): number;

    /**
     * Sets HSLa components from 32-bit integer representation.
     *
     * ```ts
     * clr().hsl32(0xaa_bb_cc_dd).hsl();
     * ```
     *
     * @param hsl The 32-bit integer, representing color in HSLa model.
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    hsl32(hsl: Applicator<number>): Color;

    /**
     * Returns hue color component.
     *
     * @returns Hue ∈ [0, 360].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    hue(): number;

    /**
     * Sets hue color component.
     *
     * ```ts
     * clr().hue(90).hue(h => h * 2).hue();
     * // ⮕ 180
     * ```
     *
     * @param h Hue ∈ [0, 360].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    hue(h: Applicator<number>): Color;

    /**
     * Returns saturation color component.
     *
     * @returns Saturation ∈ [0, 100].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    saturation(): number;

    /**
     * Sets saturation color component.
     *
     * ```ts
     * clr().saturation(20).saturation(s => s * 2).saturation();
     * // ⮕ 40
     * ```
     * @param s Saturation ∈ [0, 100].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    saturation(s: Applicator<number>): Color;

    /**
     * Returns lightness color component.
     *
     * @returns Lightness ∈ [0, 100].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    lightness(): number;

    /**
     * Sets lightness color component.
     *
     * ```ts
     * clr().lightness(20).lightness(l => l * 2).lightness();
     * // ⮕ 40
     * ```
     * @param l Lightness ∈ [0, 100].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    lightness(l: Applicator<number>): Color;

    /**
     * Spins the hue component.
     *
     * ```ts
     * clr().spin(45);
     * // or
     * clr().hue(h => h + 45);
     * ```
     *
     * @param h The hue delta ∈ [0, 360] to spin by.
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    spin(h: number): Color;

    /**
     * Makes color lighter by the given percentage.
     *
     * ```ts
     * clr().lighten(0.2);
     * // or
     * clr().lightness(l => l * 1.2);
     * ```
     *
     * @param p The percentage ∈ [0, 1] by which the lightness must be increased.
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    lighten(p: number): Color;

    /**
     * Makes color lighter by the given percentage.
     *
     * ```ts
     * clr().darken(0.2);
     * // or
     * clr().lightness(l => l * 0.98);
     * ```
     *
     * @param p The percentage ∈ [0, 1] by which the lightness must be decreased.
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link paint-bucket/plugin/hsl!}
     */
    darken(p: number): Color;
  }
}

export default function (ctor: typeof Color): void {
  ctor.prototype.hsl = createAccessor<HSL, Partial<HSL>>(
    color => {
      const hsl = color.getComponents(HSL);
      return [hsl[0] * 360, hsl[1] * 100, hsl[2] * 100, hsl[3]];
    },

    (color, value) => {
      const hsl = color.useComponents(HSL);
      const [H, S, L, a] = value;

      if (H !== undefined) {
        hsl[0] = clamp((H / 360) % 1);
      }
      if (S !== undefined) {
        hsl[1] = clamp(S / 100);
      }
      if (L !== undefined) {
        hsl[2] = clamp(L / 100);
      }
      if (a !== undefined) {
        hsl[3] = clamp(a);
      }
    }
  );

  ctor.prototype.hsl24 = createAccessor(
    color => convertComponentsToColorInt32(color.getComponents(HSL)) >>> 8,

    (color, value) => {
      convertColorInt32ToComponents(normalizeColorInt(value, 6), color.useComponents(HSL));
    }
  );

  ctor.prototype.hsl32 = createAccessor(
    color => convertComponentsToColorInt32(color.getComponents(HSL)),

    (color, value) => {
      convertColorInt32ToComponents(normalizeColorInt(value, 8), color.useComponents(HSL));
    }
  );

  ctor.prototype.hue = createAccessor(
    color => color.getComponents(HSL)[0] * 360,

    (color, H) => {
      color.useComponents(HSL)[0] = clamp(H / 360);
    }
  );

  ctor.prototype.saturation = createAccessor(
    color => color.getComponents(HSL)[1] * 100,

    (color, S) => {
      color.useComponents(HSL)[1] = clamp(S / 100);
    }
  );

  ctor.prototype.lightness = createAccessor(
    color => color.getComponents(HSL)[2] * 100,

    (color, L) => {
      color.useComponents(HSL)[2] = clamp(L / 100);
    }
  );

  ctor.prototype.spin = function (H) {
    const hsl = this.useComponents(HSL);
    hsl[0] = clamp(((hsl[0] + H) / 360) % 1);
    return this;
  };

  ctor.prototype.lighten = function (p) {
    const hsl = this.useComponents(HSL);
    hsl[2] = clamp(hsl[2] * (1 + +p));
    return this;
  };

  ctor.prototype.darken = function (p) {
    return this.lighten(-p);
  };
}
