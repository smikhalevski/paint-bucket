import { Color, RGB } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';
import { createAccessor } from '@paint-bucket/plugin-utils';
import { parseColor } from './parseColor';
import { stringifyColor } from './stringifyColor';

const _parseColor = Color.parse;

Color.parse = value => (typeof value === 'string' && parseColor(value)) || _parseColor(value);

Color.prototype.css = createAccessor(
  color => stringifyColor(color, RGB),

  (color, value) => {
    parseColor(value, color);
  }
);

Color.prototype.cssHSL = function () {
  return stringifyColor(this, HSL);
};

Color.prototype.toString = function () {
  return this.css();
};
