/**
 * HWBa color model manipulation plugin.
 *
 * @module plugin/hwb
 */

import { Applicator, Color } from '../../core';
import { HWB } from '../../color-model/hwb';
import { clamp, createAccessor } from '../../utils';

declare module '../../core' {
  interface Color {
    /**
     * Returns HWBa components as an array where hue ∈ [0, 360], whiteness and blackness ∈ [0, 100] and alpha ∈ [0, 1]
     * (0 = transparent, 1 = opaque).
     *
     * ```ts
     * clr().hwb();
     * // ⮕ [0, 0, 0, 1]
     * ```
     *
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HWB_color_model HWB color model}
     * @plugin {@link plugin/hwb! plugin/hwb}
     */
    hwb(): HWB;

    /**
     * Sets HWBa components.
     *
     * ```ts
     * clr().hwb(([, , b]) => [240, 100, b, 0.5]);
     * ```
     *
     * @param hwb The tuple of hue ∈ [0, 360], whiteness and blackness ∈ [0, 100] and alpha ∈ [0, 1] (0 = transparent,
     * 1 = opaque). If a hue, whiteness or blackness component is omitted it is set to 0. If alpha component is omitted
     * it is set to 1.
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HWB_color_model HWB color model}
     * @plugin {@link plugin/hwb! plugin/hwb}
     */
    hwb(hwb: Applicator<HWB, Partial<HWB>>): Color;

    /**
     * Returns whiteness color component.
     *
     * @returns Whiteness ∈ [0, 100].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HWB_color_model HWB color model}
     * @plugin {@link plugin/hwb! plugin/hwb}
     */
    whiteness(): number;

    /**
     * Sets whiteness color component.
     *
     * ```ts
     * clr().whiteness(20).whiteness(w => w * 2).whiteness();
     * // ⮕ 40
     * ```
     * @param w Whiteness ∈ [0, 100].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HWB_color_model HWB color model}
     * @plugin {@link plugin/hwb! plugin/hwb}
     */
    whiteness(w: Applicator<number>): Color;

    /**
     * Returns blackness color component.
     *
     * @returns Blackness ∈ [0, 100].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HWB_color_model HWB color model}
     * @plugin {@link plugin/hwb! plugin/hwb}
     */
    blackness(): number;

    /**
     * Sets blackness color component.
     *
     * ```ts
     * clr().blackness(20).blackness(b => b * 2).blackness();
     * // ⮕ 40
     * ```
     * @param b Blackness ∈ [0, 100].
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HWB_color_model HWB color model}
     * @plugin {@link plugin/hwb! plugin/hwb}
     */
    blackness(b: Applicator<number>): Color;
  }
}

export default function hwbPlugin(ctor: typeof Color): void {
  ctor.prototype.hwb = createAccessor<HWB, Partial<HWB>>(
    color => {
      const hwb = color.getComponents(HWB);
      return [hwb[0] * 360, hwb[1] * 100, hwb[2] * 100, hwb[3]];
    },

    (color, value) => {
      const hwb = color.useComponents(HWB);
      const [H, W, B, a] = value;

      if (H !== undefined) {
        hwb[0] = clamp((H / 360) % 1);
      }
      if (W !== undefined) {
        hwb[1] = clamp(W / 100);
      }
      if (B !== undefined) {
        hwb[2] = clamp(B / 100);
      }
      if (a !== undefined) {
        hwb[3] = clamp(a);
      }
    }
  );

  ctor.prototype.whiteness = createAccessor(
    color => color.getComponents(HWB)[1] * 100,

    (color, W) => {
      color.useComponents(HWB)[1] = clamp(W / 100);
    }
  );

  ctor.prototype.blackness = createAccessor(
    color => color.getComponents(HWB)[2] * 100,

    (color, B) => {
      color.useComponents(HWB)[2] = clamp(B / 100);
    }
  );
}
