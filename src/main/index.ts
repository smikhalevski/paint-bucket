/**
 * @module core
 */

import './plugin/cmyk/index.js';
import './plugin/css/index.js';
import './plugin/difference/index.js';
import './plugin/hsl/index.js';
import './plugin/hsv/index.js';
import './plugin/hwb/index.js';
import './plugin/lab/index.js';
import './plugin/labh/index.js';
import './plugin/palette/index.js';
import './plugin/rgb/index.js';
import './plugin/x11/index.js';

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
