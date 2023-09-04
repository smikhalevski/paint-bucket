/**
 * @module paint-bucket/core
 */

import { Color } from './core';

import cmykPlugin from './plugin/cmyk';
import cssPlugin from './plugin/css';
import differencePlugin from './plugin/difference';
import hslPlugin from './plugin/hsl';
import labPlugin from './plugin/lab';
import palettePlugin from './plugin/palette';
import rgbPlugin from './plugin/rgb';
import x11Plugin from './plugin/x11';

cmykPlugin(Color);
cssPlugin(Color);
differencePlugin(Color);
hslPlugin(Color);
labPlugin(Color);
palettePlugin(Color);
rgbPlugin(Color);
x11Plugin(Color);

export type * from './plugin/cmyk';
export type * from './plugin/css';
export type * from './plugin/difference';
export type * from './plugin/hsl';
export type * from './plugin/lab';
export type * from './plugin/palette';
export type * from './plugin/rgb';
export type * from './plugin/x11';

export * from './core';

export { CMYK } from './color-model/cmyk';
export { HSL } from './color-model/hsl';
export { HSV } from './color-model/hsv';
export { LAB } from './color-model/lab';
export { XYZ } from './color-model/xyz';
