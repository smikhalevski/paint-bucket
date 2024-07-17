/**
 * CIE-L\*a\*b\* color model manipulation plugin.
 *
 * @module plugin/lab
 */

import { Applicator, Color } from '../../core';
import { LAB } from '../../color-model/lab';
import { clamp, createAccessor } from '../../utils';

declare module '../../core' {
  interface Color {
    /**
     * Returns CIE-L\*a\*b\* components as an array where L\* ∈ [0, 100], a\* and b\* ∈ [-100, 100], and alpha ∈ [0, 1]
     * (0 = transparent, 1 = opaque).
     *
     * ```ts
     * clr().lab();
     * // ⮕ [0, 0, 0, 1]
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link plugin/lab! plugin/lab}
     */
    lab(): LAB;

    /**
     * Sets CIE-L\*a\*b\* components.
     *
     * @param lab The tuple of L\* ∈ [0, 100], a\* and b\* ∈ [-100, 100], and alpha ∈ [0, 1] (0 = transparent,
     * 1 = opaque). If L\*, a\*, or b\* component is omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @group Plugin Methods
     * @plugin {@link plugin/lab! plugin/lab}
     */
    lab(lab: Applicator<LAB, Partial<LAB>>): Color;
  }
}

export default function labPlugin(ctor: typeof Color): void {
  ctor.prototype.lab = createAccessor<LAB, Partial<LAB>>(
    color => {
      const lab = color.getComponents(LAB);
      return [lab[0] * 100, lab[1] * 200 - 100, lab[2] * 200 - 100, lab[3]];
    },

    (color, value) => {
      const lab = color.useComponents(LAB);
      const [L, A, B, a] = value;

      if (L !== undefined) {
        lab[0] = clamp(L / 100);
      }
      if (A !== undefined) {
        lab[1] = clamp((A + 100) / 200);
      }
      if (B !== undefined) {
        lab[2] = clamp((B + 100) / 200);
      }
      if (a !== undefined) {
        lab[3] = clamp(a);
      }
    }
  );
}
