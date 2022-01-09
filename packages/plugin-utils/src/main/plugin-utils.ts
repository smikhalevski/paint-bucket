import {Color, ColorLike} from '@paint-bucket/core';
import {Accessor} from './plugin-types';

export function createAccessor<O, I>(get: (this: Color) => O, set: (this: Color, value: I) => void): Accessor<O, I> {
  return function (this: Color): any {
    if (arguments.length === 0) {
      return get.call(this);
    }
    const value = arguments[0];
    set.call(this, typeof value === 'function' ? value(get.call(this)) : value);
    return this;
  };
}

/**
 * Returns a {@link Color} instance as is or creates a new {@link Color} instance with given input.
 */
export function toColor(color: ColorLike | null | undefined): Color;

export function toColor(color: unknown): Color {
  return color instanceof Color ? color : Color.parser(color);
}
