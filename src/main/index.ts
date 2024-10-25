/**
 * @module core
 */

import './plugin/cmyk';
import './plugin/css';
import './plugin/difference';
import './plugin/hsl';
import './plugin/hsv';
import './plugin/hwb';
import './plugin/lab';
import './plugin/labh';
import './plugin/palette';
import './plugin/rgb';
import './plugin/x11';

export type * from './plugin/cmyk';
export type * from './plugin/css';
export type * from './plugin/difference';
export type * from './plugin/hsl';
export type * from './plugin/lab';
export type * from './plugin/palette';
export type * from './plugin/rgb';
export type * from './plugin/x11';

export type {
  ColorLike,
  ColorModel,
  ColorLikeSource,
  Applicator,
  Interpolator,
  InterpolatorFactory,
  Accessor,
} from './core';

export { Color, RGB, Gradient, clr } from './core';

export { CMYK } from './color-model/cmyk';
export { HSL } from './color-model/hsl';
export { HSV } from './color-model/hsv';
export { HWB } from './color-model/hwb';
export { LAB } from './color-model/lab';
export { LABh } from './color-model/labh';
export { XYZ } from './color-model/xyz';
