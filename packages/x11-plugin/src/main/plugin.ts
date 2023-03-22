import { Color, Rgb } from '@paint-bucket/core';
import { x11Components } from './x11-components';

Color.overrideParser(next => value => {
  if (typeof value === 'string') {
    const components = x11Components.get(value.toLowerCase());

    if (components) {
      return new Color(Rgb, components.slice(0));
    }
  }
  return next(value);
});
