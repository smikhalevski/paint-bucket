import { Color, RGB } from '@paint-bucket/core';
import { createAccessor } from '@paint-bucket/plugin-utils';
import { parseCssColor } from './parseCssColor';
import { stringifyRGB } from './stringifyRGB';

const { parse } = Color;

Color.parse = value => (typeof value === 'string' ? parseCssColor(value) || parse(value) : parse(value));

Color.prototype.css = createAccessor(
  color => stringifyRGB(color.getComponents(RGB)),

  (color0, value) => {
    const color = parseCssColor(value);
    if (color) {
      color0['_model'] = color['_model'];
      color0['_components'] = color['_components'];
    } else {
      color0['_model'] = RGB;
      color0['_components'] = [0, 0, 0, 1];
    }
    return color0;
  }
);

Color.prototype.toString = function () {
  return this.css();
};
