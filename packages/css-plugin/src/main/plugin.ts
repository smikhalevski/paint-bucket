import { Color, Rgb } from '@paint-bucket/core';
import { createAccessor, enhanceColorParse } from '@paint-bucket/plugin-utils';
import { parseCssColor } from './parseCssColor';
import { stringifyRgb } from './stringifyRgb';

enhanceColorParse(next => value => {
  if (typeof value === 'string') {
    const color = parseCssColor(value);

    if (color) {
      return color;
    }
  }
  return next(value);
});

Color.prototype.css = createAccessor(
  color => stringifyRgb(color.get(Rgb)),

  (color0, value) => {
    const color = parseCssColor(value);
    if (color) {
      color0['_model'] = color['_model'];
      color0['_components'] = color['_components'];
    } else {
      color0['_model'] = Rgb;
      color0['_components'] = [0, 0, 0, 1];
    }
    return color0;
  }
);

Color.prototype.toString = function () {
  return this.css();
};
