import {Color, Rgb} from '@paint-bucket/core';
import {createAccessor} from '@paint-bucket/plugin-utils';
import {parseCssColor} from './parseCssColor';
import {stringifyRgb} from './stringifyRgb';

Color.overrideParser((next) => (value) => {
  if (typeof value === 'string') {
    const color = parseCssColor(value);

    if (color) {
      return color;
    }
  }
  return next(value);
});

const colorPrototype = Color.prototype;

colorPrototype.css = createAccessor(
    function (this: Color) {
      return stringifyRgb(this.get(Rgb));
    },
    function (this: Color, value) {
      const color = parseCssColor(value);
      if (color) {
        this.model = color.model;
        this.components = color.components;
      } else {
        this.model = Rgb;
        this.components = [0, 0, 0, 1];
      }
      return this;
    },
);
