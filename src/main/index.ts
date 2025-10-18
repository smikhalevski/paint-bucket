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

export type * from './plugin/cmyk/index.js';
export type * from './plugin/css/index.js';
export type * from './plugin/difference/index.js';
export type * from './plugin/hsl/index.js';
export type * from './plugin/lab/index.js';
export type * from './plugin/palette/index.js';
export type * from './plugin/rgb/index.js';
export type * from './plugin/x11/index.js';

export type {
  ColorLike,
  ColorModel,
  ColorLikeSource,
  Applicator,
  Interpolator,
  InterpolatorFactory,
  Accessor,
} from './core.js';

export { Color, RGB, Gradient, clr } from './core.js';

export { CMYK } from './color-model/cmyk/index.js';
export { HSL } from './color-model/hsl/index.js';
export { HSV } from './color-model/hsv/index.js';
export { HWB } from './color-model/hwb/index.js';
export { LAB } from './color-model/lab/index.js';
export { LABh } from './color-model/labh/index.js';
export { XYZ } from './color-model/xyz/index.js';
