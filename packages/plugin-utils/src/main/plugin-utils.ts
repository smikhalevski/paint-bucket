import { Color } from '@paint-bucket/core';
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
