import { Color, RGB } from '../../core';
import { clamp, getColorInt32Component, normalizeColorInt } from '../../utils';
import { HSL } from '../../color-model/hsl';

const valuePattern = '\\s*(\\d+(?:\\.\\d+)?%?)';

const separatorPattern = '(?:\\s*,|\\s+)';

// prettier-ignore
const colorRegex = new RegExp(
  '^' +

  '(?:' +
  'rgba?\\s*\\(?' + valuePattern + separatorPattern +
  '|' +
  'hsla?\\s*\\(?\\s*(\\d+(?:\\.\\d+)?(?:%|deg)?)' + separatorPattern +
  ')' +

  valuePattern + separatorPattern +
  valuePattern +
  '(?:(?:\\s*[,/]|\\s+)' + valuePattern + ')?' +
  '\\s*\\)?' +

  '$',
  'i',
);

export function parseColor(str: string, color: Color): Color | null {
  str = str.trim();

  let match;

  if (
    (str.charCodeAt(0) === 35 /* # */ && ((str = str.substring(1)), true)) ||
    (match = colorRegex.exec(str)) === null
  ) {
    const value = normalizeColorInt(+('0x' + str), str.length);

    const components = color.useComponents(RGB);

    if (value !== value) {
      components[0] = 0;
      components[1] = 0;
      components[2] = 0;
      components[3] = 1;
      return null;
    }

    components[0] = getColorInt32Component(value, 0) / 0xff;
    components[1] = getColorInt32Component(value, 1) / 0xff;
    components[2] = getColorInt32Component(value, 2) / 0xff;
    components[3] = getColorInt32Component(value, 3) / 0xff;

    return color;
  }

  const [, rgbA, hslA, b, c, d] = match;

  let components;

  if (rgbA !== undefined) {
    components = color.useComponents(RGB);

    components[0] = parseValue(rgbA, 0xff);
    components[1] = parseValue(b, 0xff);
    components[2] = parseValue(c, 0xff);
  } else {
    components = color.useComponents(HSL);

    components[0] = parseValue(hslA, 360);
    components[1] = parseValue(b, 100);
    components[2] = parseValue(c, 100);
  }

  components[3] = d !== undefined ? parseValue(d, 1) : 1;

  return color;
}

function parseValue(str: string, denominator: number): number {
  return clamp(parseFloat(str) / (str.charCodeAt(str.length - 1) === 37 /* % */ ? 100 : denominator));
}
