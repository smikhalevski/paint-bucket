import {Color} from '@paint-bucket/core';

/**
 * An applicator is a literal value that must be set or a callback that receives the previous value and return the new
 * one.
 */
export type Applicator<O, I = O> = I | ((prevValue: O) => I);

/**
 * An accessor is a callback that returns the value if called without arguments and sets value if called with a single
 * {@link Applicator} argument.
 */
export interface Accessor<O, I = O> {

  // getter
  (): O;

  // setter
  (value: Applicator<I, O>): Color;
}
