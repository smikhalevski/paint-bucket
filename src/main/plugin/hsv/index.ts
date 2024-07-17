/**
 * HSVa color model manipulation plugin.
 *
 * @module plugin/hsv
 */

import { Applicator, Color } from '../../core';
import { HSV } from '../../color-model/hsv';
import { clamp, createAccessor } from '../../utils';

declare module '../../core' {
  interface Color {
    /**
     * Returns HSVa components as an array where hue ∈ [0, 360], saturation and value ∈ [0, 100] and alpha ∈ [0, 1]
     * (0 = transparent, 1 = opaque).
     *
     * ```ts
     * clr().hsv();
     * // ⮕ [0, 0, 0, 1]
     * ```
     *
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link plugin/hsv! paint-bucket/plugin/hsv}
     */
    hsv(): HSV;

    /**
     * Sets HSVa components.
     *
     * ```ts
     * clr().hsv(([, , v]) => [240, 100, v, 0.5]);
     * ```
     *
     * @param hsv The tuple of hue ∈ [0, 360], saturation and value ∈ [0, 100] and alpha ∈ [0, 1] (0 = transparent,
     * 1 = opaque). If a hue, saturation or value component is omitted it is set to 0. If alpha component is omitted
     * it is set to 1.
     * @group Plugin Methods
     * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV HSL and HSV color models}
     * @plugin {@link plugin/hsv! paint-bucket/plugin/hsv}
     */
    hsv(hsv: Applicator<HSV, Partial<HSV>>): Color;
  }
}

export default function hsvPlugin(ctor: typeof Color): void {
  ctor.prototype.hsv = createAccessor<HSV, Partial<HSV>>(
    color => {
      const hsv = color.getComponents(HSV);
      return [hsv[0] * 360, hsv[1] * 100, hsv[2] * 100, hsv[3]];
    },

    (color, value) => {
      const hsv = color.useComponents(HSV);
      const [H, S, V, a] = value;

      if (H !== undefined) {
        hsv[0] = clamp((H / 360) % 1);
      }
      if (S !== undefined) {
        hsv[1] = clamp(S / 100);
      }
      if (V !== undefined) {
        hsv[2] = clamp(V / 100);
      }
      if (a !== undefined) {
        hsv[3] = clamp(a);
      }
    }
  );
}
