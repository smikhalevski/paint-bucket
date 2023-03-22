import { Color, Rgb } from '@paint-bucket/core';
import { x11Colors } from './x11-colors';
import { enhanceColorParse } from '@paint-bucket/plugin-utils';

enhanceColorParse(next => value => {
  if (typeof value === 'string') {
    const components = x11Colors.get(value.toLowerCase());

    if (components !== undefined) {
      return new Color(Rgb, components.slice(0));
    }
  }
  return next(value);
});
