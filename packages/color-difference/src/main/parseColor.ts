import {normalizeChannels} from '@paint-bucket/core/src/main/channel-utils';
import {Hsl, Rgb} from './colors';
import {FF} from '@paint-bucket/core/src/main/int64';

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

export function parseColor(color: string): Rgb | Hsl {

  color = color.trim();

  if (color.charCodeAt(0) === 35 /* # */) {
    const rgb = new Rgb();
    rgb.setRawColor(normalizeChannels(parseInt(color.substr(1), 16), color.length - 1));
    return rgb;
  }

  const rawColor = parseInt(color, 16);

  if (!isNaN(rawColor)) {
    const rgb = new Rgb();
    rgb.setRawColor(normalizeChannels(rawColor, color.length));
    return rgb;
  }

  const tupleMatch = tupleRe.exec(color);

  if (tupleMatch) {
    const colorSpaceName = tupleMatch[1].toLowerCase();

    const a = parseByte(tupleMatch[2]);
    const b = parseByte(tupleMatch[3]);
    const c = parseByte(tupleMatch[4]);
    const d = parseAlpha(tupleMatch[5]);

    if (colorSpaceName === 'rgb' || colorSpaceName === 'rgba') {
      return new Rgb(a, b, c, d);
    }
    if (colorSpaceName === 'hsl' || colorSpaceName === 'hsla') {
      return new Hsl(a, b, c, d);
    }
  }

  throw new Error('Invalid color format: ' + color);
}

function parseByte(value: string): number {
  return isPercentage(value) ? parseFloat(value) / 100 * FF : parseFloat(value);
}

function parseAlpha(value: string | undefined): number {
  return value === undefined ? FF : isPercentage(value) ? parseFloat(value) / 100 * FF : parseFloat(value) * FF;
}

function isPercentage(value: string): boolean {
  return value.charCodeAt(value.length - 1) === 37; /* % */
}
