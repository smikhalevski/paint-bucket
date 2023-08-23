import { Color } from './Color';
import { ColorLike } from './types';

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
