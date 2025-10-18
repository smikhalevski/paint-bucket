import { ColorLike } from './types.js';
import { Color } from './Color.js';
import { Gradient } from './Gradient.js';

/**
 * Parses value into a {@link Color} instance. When another color instance is provided, it is cloned.
 *
 * @param value The value to parse.
 * @returns The parsed color, or black color if value is invalid.
 * @see {@link Color.parse Color.parse}
 */
export function clr(value?: ColorLike): Color {
  return value instanceof Color ? value.clone() : Color.parse(value);
}

clr.gradient = gradient;

/**
 * Creates a new gradient with equidistant stops.
 *
 * @param colors The list of colors that comprise the gradient.
 * @param minValue The value of the first color in colors.
 * @param maxValue The value of the last color in colors.
 */
function gradient(
  colors?: readonly ColorLike[],
  minValue = 0,
  maxValue = colors === undefined ? 0 : minValue + colors.length - 1
): Gradient {
  const gradient = new Gradient();

  if (colors === undefined) {
    return gradient;
  }

  for (let i = 0; i < colors.length; ++i) {
    gradient.stop(minValue + (maxValue - minValue) * (i / (colors.length - 1)), colors[i]);
  }
  return gradient;
}
