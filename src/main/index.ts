/**
 * @module paint-bucket/core
 */

import { Color } from './core';

import enableCSS from './plugin/css';
import enableDifference from './plugin/difference';
import enableHSL from './plugin/hsl';
import enablePalette from './plugin/palette';
import enableRGB from './plugin/rgb';
import enableX11 from './plugin/x11';

enableCSS(Color);
enableDifference(Color);
enableHSL(Color);
enablePalette(Color);
enableRGB(Color);
enableX11(Color);

export type * from './plugin/css';
export type * from './plugin/difference';
export type * from './plugin/hsl';
export type * from './plugin/palette';
export type * from './plugin/rgb';
export type * from './plugin/x11';

export * from './core';
export { HSL } from './color-model/hsl';
export { HSV } from './color-model/hsv';
export { LAB } from './color-model/lab';
export { XYZ } from './color-model/xyz';
