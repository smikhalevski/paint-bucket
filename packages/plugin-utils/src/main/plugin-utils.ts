import { Color, ColorConstructor, ColorLike } from '@paint-bucket/core';
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

export function toColor(value: ColorLike): Color {
  return value instanceof Color ? value : Color.parse(value);
}

export function enhanceParse(
  constructor: ColorConstructor,
  enhancer: (parse: (value: ColorLike) => Color) => (value: ColorLike) => Color
): void {
  constructor.parse = enhancer(constructor.parse);
}
