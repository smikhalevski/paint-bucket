import { Color } from '@paint-bucket/core';
import cssPlugin from '@paint-bucket/css-plugin';
import differencePlugin from '@paint-bucket/difference-plugin';
import gradientPlugin from '@paint-bucket/gradient-plugin';
import hslPlugin from '@paint-bucket/hsl-plugin';
import palettePlugin from '@paint-bucket/palette-plugin';
import rgbPlugin from '@paint-bucket/rgb-plugin';
import x11Plugin from '@paint-bucket/x11-plugin';

export * from '@paint-bucket/hsl';
export * from '@paint-bucket/hsv';
export * from '@paint-bucket/lab';
export * from '@paint-bucket/xyz';
export * from '@paint-bucket/core';

const Color_ = Color.applyPlugins(
  cssPlugin,
  differencePlugin,
  gradientPlugin,
  hslPlugin,
  palettePlugin,
  rgbPlugin,
  x11Plugin
);

export { Color_ as Color };
