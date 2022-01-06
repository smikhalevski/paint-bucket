import {Color, ColorLike} from '@paint-bucket/core/lib/Color';
import {ColorModel} from '@paint-bucket/core/lib/color-model';

/**
 * An applicator is a literal value that must be set or a callback that receives the previous value and return the new
 * one.
 */
export type Applicator<O, I = O> = O | ((prevValue: O) => I);

/**
 * An accessor is a callback that returns the value if called without arguments and sets value if called with an
 * applicator.
 */
export interface Accessor<O, I = O> {

  // getter
  (): O;

  // setter
  (value: Applicator<I, O>): Color;
}

export function createAccessor<O, I>(get: (color: Color) => O, set: (color: Color, value: I) => void): Accessor<O, I> {
  return <Accessor<O, I>>function (this: Color) {
    if (arguments.length === 0) {
      return get(this);
    }
    set(this, typeof arguments[0] === 'function' ? arguments[0](get(this)) : arguments[0]);
    return this;
  };
}

export function createComponentAccessor(colorModel: ColorModel, index: number, a = 0, b = 1, A = 0, B = 0xFF): Accessor<number> {
  return createAccessor(
      (color) => color.get(colorModel)[index],
      (color, value) => {
        color.use(colorModel)[index] = value;
      },
  );
}

export function toColor(color: ColorLike): Color {
  return color instanceof Color ? color : Color.factory(color);
}

export function hasProperty(value: unknown, ...propertyNames: string[]): boolean
export function hasProperty(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  for (let i = 1; i < arguments.length; ++i) {
    if (value.hasOwnProperty(arguments[i])) {
      return true;
    }
  }
  return false;
}
