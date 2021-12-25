import {normalizeChannels} from '@paint-bucket/core';
import {createRgb, intToRgb, IRgb} from '@paint-bucket/core';
import {createHsl, IHsl} from '@paint-bucket/hsl';

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

export function parseCssColor(color: string): IRgb | IHsl {

  color = color.trim();

  if (color.charCodeAt(0) === 35 /* # */) {
    return intToRgb(normalizeChannels(parseInt(color.substr(1), 16), color.length - 1), createRgb());
  }

  const rawColor = parseInt(color, 16);

  if (!isNaN(rawColor)) {
    return intToRgb(normalizeChannels(rawColor, color.length), createRgb());
  }

  const tupleMatch = tupleRe.exec(color);

  if (tupleMatch) {
    const colorSpaceName = tupleMatch[1].toLowerCase();

    const a = parseByte(tupleMatch[2]);
    const b = parseByte(tupleMatch[3]);
    const c = parseByte(tupleMatch[4]);
    const d = parseAlpha(tupleMatch[5]);

    if (colorSpaceName === 'rgb' || colorSpaceName === 'rgba') {
      return createRgb(a, b, c, d);
    }
    if (colorSpaceName === 'hsl' || colorSpaceName === 'hsla') {
      return createHsl(a, b, c, d);
    }
  }

  throw new Error('Invalid color format: ' + color);
}

function parseByte(value: string): number {
  return isPercentage(value) ? parseFloat(value) / 100 * 0xFF : parseFloat(value);
}

function parseAlpha(value: string | undefined): number {
  return value === undefined ? 0xFF : isPercentage(value) ? parseFloat(value) / 100 * 0xFF : parseFloat(value) * 0xFF;
}

function isPercentage(value: string): boolean {
  return value.charCodeAt(value.length - 1) === 37; /* % */
}
