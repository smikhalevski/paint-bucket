/**
 * @module core
 */

import { Color } from './core';

import cmykPlugin from './plugin/cmyk/index';
import cssPlugin from './plugin/css/index';
import differencePlugin from './plugin/difference/index';
import hslPlugin from './plugin/hsl/index';
import hsvPlugin from './plugin/hsv/index';
import hwbPlugin from './plugin/hwb/index';
import labPlugin from './plugin/lab/index';
import labhPlugin from './plugin/labh/index';
import palettePlugin from './plugin/palette/index';
import rgbPlugin from './plugin/rgb/index';
import x11Plugin from './plugin/x11/index';

cmykPlugin(Color);
cssPlugin(Color);
differencePlugin(Color);
hslPlugin(Color);
hsvPlugin(Color);
hwbPlugin(Color);
labPlugin(Color);
labhPlugin(Color);
palettePlugin(Color);
rgbPlugin(Color);
x11Plugin(Color);

export type * from './plugin/cmyk/index';
export type * from './plugin/css/index';
export type * from './plugin/difference/index';
export type * from './plugin/hsl/index';
export type * from './plugin/lab/index';
export type * from './plugin/palette/index';
export type * from './plugin/rgb/index';
export type * from './plugin/x11/index';

export * from './core';

export { CMYK } from './color-model/cmyk/index';
export { HSL } from './color-model/hsl/index';
export { HSV } from './color-model/hsv/index';
export { HWB } from './color-model/hwb/index';
export { LAB } from './color-model/lab/index';
export { LABh } from './color-model/labh/index';
export { XYZ } from './color-model/xyz/index';
