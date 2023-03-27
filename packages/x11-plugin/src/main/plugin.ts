import { Color, RGB } from '@paint-bucket/core';
import { x11Components } from './x11-components';

const _parseColor = Color.parse;

Color.parse = value => {
  if (typeof value === 'string') {
    const components = x11Components.get(value.toLowerCase());

    if (components !== undefined) {
      return new Color(RGB, components.slice(0));
    }
  }
  return _parseColor(value);
};
