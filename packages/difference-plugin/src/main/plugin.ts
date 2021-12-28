import {Color} from '@paint-bucket/core';
import {deltaE2000} from './deltaE2000';
import {LAB} from '@paint-bucket/lab';

declare module '@paint-bucket/core/lib/Color' {

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
     * @see http://zschuessler.github.io/DeltaE/learn
     * @see http://www.ece.rochester.edu/~gsharma/ciede2000/
     * @see https://en.wikipedia.org/wiki/Color_difference
     * @see https://en.wikipedia.org/wiki/Just-noticeable_difference
     */
    deltaE2000(color: Color): number;

    /**
     * Returns `true` if colors are so close that they can be barely distinguished.
     *
     * Uses CIEDE2000 color diffing algorithm.
     *
     * @see http://zschuessler.github.io/DeltaE/learn
     * @see http://www.ece.rochester.edu/~gsharma/ciede2000/
     * @see https://en.wikipedia.org/wiki/Color_difference
     * @see https://en.wikipedia.org/wiki/Just-noticeable_difference
     */
    isJnd(color: Color): boolean;
  }
}

Color.prototype.deltaE2000 = function (this: Color, color) {
  return deltaE2000(this.get(LAB), color.get(LAB));
};

Color.prototype.isJnd = function (this: Color, color) {
  return this.deltaE2000(color) < 2.3;
};
