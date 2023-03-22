import { Color, ColorParse } from '@paint-bucket/core';
import { Accessor } from './plugin-types';

export function createAccessor<O, I>(get: (color: Color) => O, set: (color: Color, value: I) => void): Accessor<O, I> {
  return function (this: Color): any {
    if (arguments.length === 0) {
      return get(this);
    }

    const value = arguments[0];

    set(this, typeof value === 'function' ? value(get(this)) : value);

    return this;
  };
}

/**
 * Overrides parsing implementation that backs the {@link Color.parse} function.
 *
 * Use this in plugins to add new parsing mechanisms or static methods for {@link Color.parse} function.
 */
export function enhanceColorParse(cb: (next: (value: any) => Color) => ColorParse): void {
  Color.parse = cb(Color.parse);
}
