import { Color, RGB } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';
import { convertColorIntToComponents, normalizeColorInt } from '@paint-bucket/plugin-utils';

/**
 * CSS numerical or percentage value.
 *
 * @see http://www.w3.org/TR/css3-values/#integers
 * @see http://www.w3.org/TR/css3-values/#number-value
 */
const VALUE = '[-+]?(?:\\d*\\.)?\\d+\\s*%?';

const COMMA = '(?:\\s*,\\s*|\\s+)';

const COMMA_OR_SLASH = '(?:\\s*[,/]\\s*|\\s+)';

const TUPLE = `^(\\w+)\\s*\\(?\\s*(${VALUE})${COMMA}(${VALUE})${COMMA}(${VALUE})(?:${COMMA_OR_SLASH}(${VALUE}))?\\s*?\\)?$`;

const tupleRe = RegExp(TUPLE);

export function parseCssColor(value: string): Color | undefined {
  value = value.trim();

  if (value.charCodeAt(0) === 35 /* # */) {
    return new Color(
      RGB,
      convertColorIntToComponents(normalizeColorInt(parseInt(value.substr(1), 16), value.length - 1), [0, 0, 0, 1])
    );
  }
  if (value.toLowerCase() === 'transparent') {
    return new Color(RGB, [0, 0, 0, 0]);
  }

  const color = +('0x' + value);

  if (color === color) {
    return new Color(RGB, convertColorIntToComponents(normalizeColorInt(color, value.length), [0, 0, 0, 1]));
  }

  const tupleMatch = tupleRe.exec(value);

  if (tupleMatch) {
    const colorModelName = tupleMatch[1].toLowerCase();
    const alpha = parseAlpha(tupleMatch[5]);

    if (colorModelName === 'rgb' || colorModelName === 'rgba') {
      return new Color(RGB, [parseByte(tupleMatch[2]), parseByte(tupleMatch[3]), parseByte(tupleMatch[4]), alpha]);
    }
    if (colorModelName === 'hsl' || colorModelName === 'hsla') {
      return new Color(HSL, [parseDegrees(tupleMatch[2]), parseByte(tupleMatch[3]), parseByte(tupleMatch[4]), alpha]);
    }
  }
}

function parseByte(value: string): number {
  return isPercentage(value) ? parseFloat(value) / 100 : parseFloat(value) / 0xff;
}

function parseDegrees(value: string): number {
  return isPercentage(value) ? parseFloat(value) / 100 : parseFloat(value) / 360;
}

function parseAlpha(value: string | undefined): number {
  return value === undefined ? 1 : isPercentage(value) ? parseFloat(value) / 100 : parseFloat(value);
}

function isPercentage(value: string): boolean {
  return value.charCodeAt(value.length - 1) === 37; /* % */
}
