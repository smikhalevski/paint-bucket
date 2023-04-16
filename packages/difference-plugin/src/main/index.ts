import { ColorConstructor, ColorLike } from '@paint-bucket/core';
import { LAB } from '@paint-bucket/lab';
import { toColor } from '@paint-bucket/plugin-utils';
import { getDeltaE } from './getDeltaE';

declare module '@paint-bucket/core' {
  interface Color {
    /**
     * Computes the CIEDE2000 color-difference.
     *
     * Returns number in range [0, 100] where 2.3 is considered to be just noticeable difference (JND).
     *
     * - [0, 1)    Not perceptible by human eyes.
     * - [1, 2)    Perceptible through close observation.
     * - [2, 10)   Perceptible at a glance.
     * - [10, 50)  Colors are more similar than opposite.
     * - [50, 100] Colors are exact opposite.
     *
     * Alpha channel is ignored.
     *
     * @see {@link http://zschuessler.github.io/DeltaE/learn Learn about Delta E 101}
     * @see {@link http://www.ece.rochester.edu/~gsharma/ciede2000 The CIEDE2000 Color-Difference formula}
     * @see {@link https://en.wikipedia.org/wiki/Color_difference Color difference}
     * @see {@link https://en.wikipedia.org/wiki/Just-noticeable_difference Just-noticeable difference}
     */
    deltaE(color: ColorLike): number;
  }
}

export default function (Color: ColorConstructor): void {
  Color.prototype.deltaE = function (color) {
    return getDeltaE(this.getComponents(LAB), toColor(color).getComponents(LAB));
  };
}
