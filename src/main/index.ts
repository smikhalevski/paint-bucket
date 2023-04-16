/**
 * @module paint-bucket/core
 */

import { Color, Gradient } from './core';

import cssPlugin from './plugin/css';
import differencePlugin from './plugin/difference';
import gradientPlugin from './plugin/gradient';
import hslPlugin from './plugin/hsl';
import palettePlugin from './plugin/palette';
import rgbPlugin from './plugin/rgb';
import x11Plugin from './plugin/x11';

cssPlugin(Color);
differencePlugin(Color);
gradientPlugin(Color, Gradient);
hslPlugin(Color);
palettePlugin(Color);
rgbPlugin(Color);
x11Plugin(Color);

export type * from './plugin/css';
export type * from './plugin/difference';
export type * from './plugin/gradient';
export type * from './plugin/hsl';
export type * from './plugin/palette';
export type * from './plugin/rgb';
export type * from './plugin/x11';

export * from './core';
export * from './color-model/hsl';
export * from './color-model/hsv';
export * from './color-model/lab';
export * from './color-model/xyz';
