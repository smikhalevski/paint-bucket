/**
 * Hunter L, a, b color model manipulation plugin.
 *
 * @module plugin/labh
 */

import type { Applicator, Color } from '../../core';
import { LABh } from '../../color-model/labh';
import { clamp, createAccessor } from '../../utils';

declare module '../../core' {
  interface Color {
    /**
     * Returns Hunter L, a, b components as an array where L ∈ [0, 100], a and b ∈ [-128, 128], and alpha ∈ [0, 1]
     * (0 = transparent, 1 = opaque).
     *
     * ```ts
     * clr().labh();
     * // ⮕ [0, 0, 0, 1]
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link plugin/labh! plugin/labh}
     */
    labh(): LABh;

    /**
     * Sets Hunter L, a, b components.
     *
     * @param labh The tuple of L ∈ [0, 100], a and b ∈ [-128, 128], and alpha ∈ [0, 1] (0 = transparent, 1 = opaque).
     * If L, a, or b component is omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @group Plugin Methods
     * @plugin {@link plugin/labh! plugin/labh}
     */
    labh(labh: Applicator<LABh, Partial<LABh>>): Color;
  }
}

export default function labhPlugin(ctor: typeof Color): void {
  ctor.prototype.labh = createAccessor<LABh, Partial<LABh>>(
    color => {
      const lab = color.getComponents(LABh);
      return [lab[0] * 100, lab[1] * 256 - 128, lab[2] * 256 - 128, lab[3]];
    },

    (color, value) => {
      const labh = color.useComponents(LABh);
      const [L, A, B, a] = value;

      if (L !== undefined) {
        labh[0] = clamp(L / 100);
      }
      if (A !== undefined) {
        labh[1] = clamp((A + 128) / 256);
      }
      if (B !== undefined) {
        labh[2] = clamp((B + 128) / 256);
      }
      if (a !== undefined) {
        labh[3] = clamp(a);
      }
    }
  );
}
