/**
 * CMYKa color model manipulation plugin.
 *
 * @module paint-bucket/plugin/cmyk
 */

import { CMYK } from '../../color-model/cmyk';
import { Applicator, Color } from '../../core';
import { clamp, createAccessor } from '../../utils';

declare module '../../core' {
  interface Color {
    /**
     * Returns CMYKa components as an array where C, M, Y, and K ∈ [0, 100], and a ∈ [0, 1] (0 = transparent, 1 =
     * opaque).
     *
     * ```ts
     * clr().cmyk();
     * // ⮕ [0, 0, 0, 1, 1]
     * ```
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    cmyk(): CMYK;

    /**
     * Sets HSLa components.
     *
     * ```ts
     * clr().cmyk(([, , Y]) => [50, 64, Y, 43, 0.5]);
     * ```
     *
     * @param hsl The tuple of C, M, Y, and K ∈ [0, 100], and a ∈ [0, 1] (0 = transparent, 1 = opaque). If a C, M, Y, or
     * K component is omitted it is set to 0. If alpha component is omitted it is set to 1.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    cmyk(hsl: Applicator<CMYK, Partial<CMYK>>): Color;

    /**
     * Returns cyan color component.
     *
     * @returns Cyan ∈ [0, 100].
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    cyan(): number;

    /**
     * Sets cyan color component.
     *
     * ```ts
     * clr().cyan(10).cyan(C => C * 2).cyan();
     * // ⮕ 20
     * ```
     *
     * @param C Cyan ∈ [0, 100].
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    cyan(C: Applicator<number>): Color;

    /**
     * Returns magenta color component.
     *
     * @returns Magenta ∈ [0, 100].
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    magenta(): number;

    /**
     * Sets magenta color component.
     *
     * ```ts
     * clr().magenta(10).magenta(M => M * 2).magenta();
     * // ⮕ 20
     * ```
     *
     * @param M Magenta ∈ [0, 100].
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    magenta(M: Applicator<number>): Color;

    /**
     * Returns yellow color component.
     *
     * @returns Yellow ∈ [0, 100].
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    yellow(): number;

    /**
     * Sets yellow color component.
     *
     * ```ts
     * clr().yellow(10).yellow(Y => Y * 2).yellow();
     * // ⮕ 20
     * ```
     *
     * @param Y Yellow ∈ [0, 100].
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    yellow(Y: Applicator<number>): Color;

    /**
     * Returns black color component.
     *
     * @returns Black ∈ [0, 100].
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    black(): number;

    /**
     * Sets black color component.
     *
     * ```ts
     * clr().black(10).black(K => K * 2).black();
     * // ⮕ 20
     * ```
     *
     * @param K Black ∈ [0, 100].
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/cmyk!}
     */
    black(K: Applicator<number>): Color;
  }
}

export default function (ctor: typeof Color): void {
  ctor.prototype.cmyk = createAccessor<CMYK, Partial<CMYK>>(
    color => {
      const cmyk = color.getComponents(CMYK);
      return [cmyk[0] * 100, cmyk[1] * 100, cmyk[2] * 100, cmyk[3] * 100, cmyk[4]];
    },

    (color, value) => {
      const cmyk = color.useComponents(CMYK);
      const [C, M, Y, K, a] = value;

      if (C !== undefined) {
        cmyk[0] = clamp(C / 100);
      }
      if (M !== undefined) {
        cmyk[1] = clamp(M / 100);
      }
      if (Y !== undefined) {
        cmyk[2] = clamp(Y / 100);
      }
      if (K !== undefined) {
        cmyk[3] = clamp(K / 100);
      }
      if (a !== undefined) {
        cmyk[4] = clamp(a);
      }
    }
  );

  ctor.prototype.cyan = createAccessor(
    color => color.getComponents(CMYK)[0] * 100,

    (color, C) => {
      color.useComponents(CMYK)[0] = clamp(C / 100);
    }
  );

  ctor.prototype.magenta = createAccessor(
    color => color.getComponents(CMYK)[1] * 100,

    (color, M) => {
      color.useComponents(CMYK)[1] = clamp(M / 100);
    }
  );

  ctor.prototype.yellow = createAccessor(
    color => color.getComponents(CMYK)[2] * 100,

    (color, Y) => {
      color.useComponents(CMYK)[2] = clamp(Y / 100);
    }
  );

  ctor.prototype.black = createAccessor(
    color => color.getComponents(CMYK)[3] * 100,

    (color, K) => {
      color.useComponents(CMYK)[3] = clamp(K / 100);
    }
  );
}
