/**
 * White point reference values with observer/illuminant.
 *
 * @see {@link http://en.wikipedia.org/wiki/Standard_illuminant Standard illuminant on Wikipedia}
 * @see {@link https://www.mathworks.com/help/images/ref/whitepoint.html White point on MathWorks}
 */
// https://github.com/colorjs/color-space/blob/master/xyz.js
export const WhitePoint = {
  /**
   * 1931 2°
   */
  deg2: {
    // Incandescent light

    /**
     * Simulates typical, domestic, tungsten-filament lighting with correlated color temperature of 2856 K.
     */
    A: [1.0985, 1, 0.35585] as WhitePoint,

    /**
     * Simulates average or north sky daylight with correlated color temperature of 6774 K. Deprecated by CIE.
     */
    C: [0.98074, 1, 1.18232] as WhitePoint,

    /**
     * Simulates warm daylight at sunrise or sunset with correlated color temperature of 5003 K. Also known as _horizon
     * light_.
     */
    D50: [0.96422, 1, 0.82521] as WhitePoint,

    /**
     * Simulates mid-morning or mid-afternoon daylight with correlated color temperature of 5500 K.
     */
    D55: [0.95682, 1, 0.92149] as WhitePoint,

    // Daylight

    /**
     * Simulates noon daylight with correlated color temperature of 6504 K.
     */
    D65: [0.95045592705167, 1, 1.089057750759878] as WhitePoint,
    D75: [0.94972, 1, 1.22638] as WhitePoint,

    // Fluorescent light

    F2: [0.99187, 1, 0.67395] as WhitePoint,
    F7: [0.95044, 1, 0.108755] as WhitePoint,
    F11: [1.00966, 1, 0.6437] as WhitePoint,

    /**
     * Equal-energy radiator.
     */
    E: [1, 1, 1] as WhitePoint,
  },

  /**
   * 1964 10°
   */
  deg10: {
    // Incandescent light

    /**
     * Simulates typical, domestic, tungsten-filament lighting with correlated color temperature of 2856 K.
     */
    A: [1.11144, 1, 0.352] as WhitePoint,

    /**
     * Simulates average or north sky daylight with correlated color temperature of 6774 K. Deprecated by CIE.
     */
    C: [0.97285, 1, 1.16145] as WhitePoint,

    /**
     * Simulates warm daylight at sunrise or sunset with correlated color temperature of 5003 K. Also known as _horizon
     * light_.
     */
    D50: [0.9672, 1, 0.81427] as WhitePoint,

    /**
     * Simulates mid-morning or mid-afternoon daylight with correlated color temperature of 5500 K.
     */
    D55: [0.95799, 1, 0.90926] as WhitePoint,

    // Daylight

    /**
     * Simulates noon daylight with correlated color temperature of 6504 K.
     */
    D65: [0.94811, 1, 1.07304] as WhitePoint,
    D75: [0.94416, 1, 1.20641] as WhitePoint,

    // Fluorescent light

    F2: [1.0328, 1, 0.69026] as WhitePoint,
    F7: [0.95792, 1, 1.07687] as WhitePoint,
    F11: [1.03866, 1, 0.65627] as WhitePoint,

    /**
     * Profile Connection Space (PCS) illuminant used in ICC profiles.
     */
    ICC: [0.9642, 1.0, 0.8249] as WhitePoint,

    /**
     * Equal-energy radiator.
     */
    E: [1, 1, 1] as WhitePoint,
  },
} as const;

/**
 * White point components.
 */
export type WhitePoint = readonly [number, number, number];
