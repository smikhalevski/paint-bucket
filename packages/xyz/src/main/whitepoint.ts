/**
 * Whitepoint reference values with observer/illuminant.
 *
 * @see http://en.wikipedia.org/wiki/Standard_illuminant
 * @see https://github.com/colorjs/color-space/blob/master/xyz.js
 * @see https://www.mathworks.com/help/images/ref/whitepoint.html
 */
export const whitepoint = {

  //1931 2°
  2: {
    // Incandescent light

    /**
     * Simulates typical, domestic, tungsten-filament lighting with correlated color temperature of 2856 K.
     */
    A: [1.0985, 1, 0.35585],

    /**
     * Simulates average or north sky daylight with correlated color temperature of 6774 K. Deprecated by CIE.
     */
    C: [0.98074, 1, 1.18232],

    /**
     * Simulates warm daylight at sunrise or sunset with correlated color temperature of 5003 K. Also known as _horizon
     * light_.
     */
    D50: [0.96422, 1, 0.82521],

    /**
     * Simulates mid-morning or mid-afternoon daylight with correlated color temperature of 5500 K.
     */
    D55: [0.95682, 1, 0.92149],

    // Daylight

    /**
     * Simulates noon daylight with correlated color temperature of 6504 K.
     */
    D65: [0.95045592705167, 1, 1.089057750759878],
    D75: [0.94972, 1, 1.22638],

    // Fluorescent light

    F2: [0.99187, 1, 0.67395],
    F7: [0.95044, 1, 0.108755],
    F11: [1.00966, 1, 0.64370],

    /**
     * Equal-energy radiator.
     */
    E: [1, 1, 1],
  },

  //1964 10°
  10: {

    // Incandescent light

    /**
     * Simulates typical, domestic, tungsten-filament lighting with correlated color temperature of 2856 K.
     */
    A: [1.11144, 1, 0.35200],

    /**
     * Simulates average or north sky daylight with correlated color temperature of 6774 K. Deprecated by CIE.
     */
    C: [0.97285, 1, 1.16145],

    /**
     * Simulates warm daylight at sunrise or sunset with correlated color temperature of 5003 K. Also known as _horizon
     * light_.
     */
    D50: [0.96720, 1, 0.81427],

    /**
     * Simulates mid-morning or mid-afternoon daylight with correlated color temperature of 5500 K.
     */
    D55: [0.95799, 1, 0.90926],

    // Daylight

    /**
     * Simulates noon daylight with correlated color temperature of 6504 K.
     */
    D65: [0.94811, 1, 1.07304],
    D75: [0.94416, 1, 1.20641],

    // Fluorescent light

    F2: [1.03280, 1, 0.69026],
    F7: [0.95792, 1, 1.07687],
    F11: [1.03866, 1, 0.65627],

    /**
     * Profile Connection Space (PCS) illuminant used in ICC profiles.
     */
    ICC: [0.9642, 1.000, 0.8249],

    /**
     * Equal-energy radiator.
     */
    E: [1, 1, 1],
  },
} as const;
