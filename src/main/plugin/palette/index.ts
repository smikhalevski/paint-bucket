/**
 * Palette generation plugin.
 *
 * @module plugin/palette
 */

import type { Color } from '../../core';
import { HSL } from '../../color-model/hsl';
import { HSV } from '../../color-model/hsv';

declare module '../../core' {
  interface Color {
    /**
     * Returns a new complement color.
     *
     * @group Plugin Methods
     * @plugin {@link plugin/palette! plugin/palette}
     */
    complement(): Color;

    /**
     * Returns three complement colors.
     *
     * @returns The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link plugin/palette! plugin/palette}
     */
    triad(): Color[];

    /**
     * Returns four complement colors.
     *
     * @returns The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link plugin/palette! plugin/palette}
     */
    tetrad(): Color[];

    /**
     * Returns three complement colors.
     *
     * @returns The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link plugin/palette! plugin/palette}
     */
    splitComplement(): Color[];

    /**
     * Returns the list of analogous colors.
     *
     * @param [n = 6] The number of colors to pick.
     * @param [slices = 30] The number of colors to pick.
     * @returns The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link plugin/palette! plugin/palette}
     */
    analogous(n?: number, slices?: number): Color[];

    /**
     * Returns the list of monochromatic colors.
     *
     * @param [n = 6] The number of colors to pick.
     * @returns The list of {@link Color} instances.
     * @group Plugin Methods
     * @plugin {@link plugin/palette! plugin/palette}
     */
    monochromatic(n?: number): Color[];
  }
}

export default function palettePlugin(ctor: typeof Color): void {
  ctor.prototype.complement = function () {
    const [H, S, L, a] = this.getComponents(HSL);

    return new ctor(HSL, [(H + 0.5) % 1, S, L, a]);
  };

  ctor.prototype.triad = function () {
    const [H, S, L, a] = this.getComponents(HSL);

    return [
      new ctor(HSL, [H, S, L, a]),
      new ctor(HSL, [(H + 1 / 3) % 1, S, L, a]),
      new ctor(HSL, [(H + 2 / 3) % 1, S, L, a]),
    ];
  };

  ctor.prototype.tetrad = function () {
    const [H, S, L, a] = this.getComponents(HSL);

    return [
      new ctor(HSL, [H, S, L, a]),
      new ctor(HSL, [(H + 1 / 4) % 1, S, L, a]),
      new ctor(HSL, [(H + 2 / 4) % 1, S, L, a]),
      new ctor(HSL, [(H + 3 / 4) % 1, S, L, a]),
    ];
  };

  ctor.prototype.splitComplement = function () {
    const [H, S, L, a] = this.getComponents(HSL);

    return [
      new ctor(HSL, [H, S, L, a]),
      new ctor(HSL, [(H + 0.2) % 1, S, L, a]),
      new ctor(HSL, [(H + 0.6) % 1, S, L, a]),
    ];
  };

  ctor.prototype.analogous = function (n = 6, slices = 30) {
    const [H, S, L, a] = this.getComponents(HSL);

    const part = 1 / slices;
    const colors = [new ctor(HSL, [H, S, L, a])];

    let nextH = (H - (part * n) / 2 + 2) % 1;

    while (--n > 0) {
      nextH = (nextH + part) % 1;
      colors.push(new ctor(HSL, [nextH, S, L, a]));
    }
    return colors;
  };

  ctor.prototype.monochromatic = function (n = 6) {
    const [H, S, V, a] = this.getComponents(HSV);

    const colors: Color[] = [];
    const deltaV = 1 / n;

    let nextV = V;

    while (n-- > 0) {
      colors.push(new ctor(HSV, [H, S, nextV, a]));
      nextV = (nextV + deltaV) % 1;
    }

    return colors;
  };
}
