import type { ColorLike } from './types';
import { Color } from './Color';
import { Gradient } from './Gradient';

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

/**
 * Creates a new gradient.
 *
 * @param colors The optional list of colors that comprise the gradient. Stop position for each color is set to its
 * index in the array.
 */
function gradient(colors?: readonly ColorLike[]): Gradient {
  const gradient = new Gradient();

  if (colors) {
    for (let i = 0; i < colors.length; ++i) {
      gradient.stop(i, colors[i]);
    }
  }
  return gradient;
}

clr.gradient = gradient;
