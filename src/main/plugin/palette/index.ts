/**
 * Palette generation plugin.
 *
 * @module paint-bucket/plugin/palette
 */

import { HSL } from '../../color-model/hsl';
import { HSV } from '../../color-model/hsv';
import { Color } from '../../core';

declare module '../../core' {
  interface Color {
    /**
     * Returns a new complement color.
     *
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/palette!}
     */
    complement(): Color;

    /**
     * Returns three complement colors.
     *
     * @return The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/palette!}
     */
    triad(): Color[];

    /**
     * Returns four complement colors.
     *
     * @return The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/palette!}
     */
    tetrad(): Color[];

    /**
     * Returns three complement colors.
     *
     * @return The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/palette!}
     */
    splitComplement(): Color[];

    /**
     * Returns the list of analogous colors.
     *
     * @param [n = 6] The number of colors to pick.
     * @param [slices = 30] The number of colors to pick.
     * @return The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/palette!}
     */
    analogous(n?: number, slices?: number): Color[];

    /**
     * Returns the list of monochromatic colors.
     *
     * @param [n = 6] The number of colors to pick.
     * @return The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link paint-bucket/plugin/palette!}
     */
    monochromatic(n?: number): Color[];
  }
}

export default function (colorConstructor: typeof Color): void {
  colorConstructor.prototype.complement = function () {
    const [H, S, L, a] = this.getComponents(HSL);

    return new colorConstructor(HSL, [(H + 0.5) % 1, S, L, a]);
  };

  colorConstructor.prototype.triad = function () {
    const [H, S, L, a] = this.getComponents(HSL);

    return [
      new colorConstructor(HSL, [H, S, L, a]),
      new colorConstructor(HSL, [(H + 1 / 3) % 1, S, L, a]),
      new colorConstructor(HSL, [(H + 2 / 3) % 1, S, L, a]),
    ];
  };

  colorConstructor.prototype.tetrad = function () {
    const [H, S, L, a] = this.getComponents(HSL);

    return [
      new colorConstructor(HSL, [H, S, L, a]),
      new colorConstructor(HSL, [(H + 1 / 4) % 1, S, L, a]),
      new colorConstructor(HSL, [(H + 2 / 4) % 1, S, L, a]),
      new colorConstructor(HSL, [(H + 3 / 4) % 1, S, L, a]),
    ];
  };

  colorConstructor.prototype.splitComplement = function () {
    const [H, S, L, a] = this.getComponents(HSL);

    return [
      new colorConstructor(HSL, [H, S, L, a]),
      new colorConstructor(HSL, [(H + 0.2) % 1, S, L, a]),
      new colorConstructor(HSL, [(H + 0.6) % 1, S, L, a]),
    ];
  };

  colorConstructor.prototype.analogous = function (n = 6, slices = 30) {
    const [H, S, L, a] = this.getComponents(HSL);

    const part = 1 / slices;
    const colors = [new colorConstructor(HSL, [H, S, L, a])];

    let nextH = (H - (part * n) / 2 + 2) % 1;

    while (--n > 0) {
      nextH = (nextH + part) % 1;
      colors.push(new colorConstructor(HSL, [nextH, S, L, a]));
    }
    return colors;
  };

  colorConstructor.prototype.monochromatic = function (n = 6) {
    const [H, S, V, a] = this.getComponents(HSV);

    const colors: Color[] = [];
    const deltaV = 1 / n;

    let nextV = V;

    while (n-- > 0) {
      colors.push(new colorConstructor(HSV, [H, S, nextV, a]));
      nextV = (nextV + deltaV) % 1;
    }

    return colors;
  };
}
