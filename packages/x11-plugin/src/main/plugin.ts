import { Color, RGB } from '@paint-bucket/core';
import { x11Colors } from './x11-colors';

const { parse } = Color;

Color.parse = value => {
  if (typeof value === 'string') {
    const components = x11Colors.get(value.toLowerCase());

    if (components !== undefined) {
      return new Color(RGB, components.slice(0));
    }
  }
  return parse(value);
};
