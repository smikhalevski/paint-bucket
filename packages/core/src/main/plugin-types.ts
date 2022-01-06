/**
 * An applicator is a literal value that must be set or a callback that receives the previous value and return the new
 * one.
 */
export type Applicator<T> = T | ((prevValue: T) => T);
