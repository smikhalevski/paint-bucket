import type { Color } from './Color';
import type { RGB } from './rgb';

/**
 * Merge declaration with this interface to add more types to {@link ColorLike} type.
 */
export interface ColorLikeSource {
  'paint-bucket': Color | undefined | null;
}

/**
 * The type of the value that can be parsed into a {@link Color} instance using {@link Color.parse} function.
 */
export type ColorLike = ColorLikeSource[keyof ColorLikeSource];

/**
 * The color model defines transformation from and to RGBa color model.
 */
export interface ColorModel {
  /**
   * The name of the color model.
   */
  readonly name: string;

  /**
   * The number of color components that the model uses.
   */
  readonly componentCount: number;

  /**
   * Converts color components to RGBa color model.
   *
   * @param components The color components.
   * @param rgb The RGBa color components to update.
   */
  convertComponentsToRGB(components: readonly number[], rgb: RGB): void;

  /**
   * Converts color components from RGBa color model to this color model.
   *
   * @param rgb RGBa color components.
   * @param components The color components that must be updated.
   */
  convertRGBToComponents(rgb: Readonly<RGB>, components: number[]): void;
}

/**
 * The interpolator function that returns an interpolated value for the given argument.
 */
export interface Interpolator {
  (x: number): number;

  /**
   * Update the interpolation domain. Used if stop colors of the gradient are changed.
   */
  update?(xs: readonly number[], ys: readonly number[]): void;
}

/**
 * Factory that returns an interpolator function for given pivot points.
 */
export type InterpolatorFactory = (xs: readonly number[], ys: readonly number[]) => Interpolator;

/**
 * An applicator is a literal value that must be set or a callback that receives the previous value and return the new
 * one.
 *
 * @template Output The value returned by the getter.
 * @template Input The value passed to the setter.
 */
export type Applicator<Output, Input = Output> = Input | ((prevValue: Output) => Input);

/**
 * An accessor is a callback that returns the value if called without arguments and sets value if called with a single
 * {@link Applicator} argument.
 *
 * @template Output The value returned by the getter.
 * @template Input The value passed to the setter.
 */
export interface Accessor<Output, Input = Output> {
  /**
   * Gets the underlying value.
   */
  (): Output;

  /**
   * Sets the underlying value.
   *
   * @param value The value or a callback that returns the new value.
   */
  (value: Applicator<Input, Output>): Color;
}
