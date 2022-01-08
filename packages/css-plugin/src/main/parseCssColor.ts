import {Color, intToComponents, normalizeComponents, Rgb} from '@paint-bucket/core';
import {Hsl} from '@paint-bucket/hsl';

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

export function parseCssColor(color: string): Color | undefined {

  color = color.trim();

  if (color.charCodeAt(0) === 35 /* # */) {
    return new Color(Rgb, intToComponents(normalizeComponents(parseInt(color.substr(1), 16), color.length - 1), [0, 0, 0, 1]));
  }

  const rawColor = parseInt(color, 16);

  if (!isNaN(rawColor)) {
    return new Color(Rgb, intToComponents(normalizeComponents(rawColor, color.length), [0, 0, 0, 1]));
  }

  const tupleMatch = tupleRe.exec(color);

  if (tupleMatch) {
    const colorModelName = tupleMatch[1].toLowerCase();
    const alpha = parseAlpha(tupleMatch[5]);

    if (colorModelName === 'rgb' || colorModelName === 'rgba') {
      return new Color(Rgb, [
        parseByte(tupleMatch[2]),
        parseByte(tupleMatch[3]),
        parseByte(tupleMatch[4]),
        alpha,
      ]);
    }
    if (colorModelName === 'hsl' || colorModelName === 'hsla') {
      return new Color(Hsl, [
        parseDegrees(tupleMatch[2]),
        parseByte(tupleMatch[3]),
        parseByte(tupleMatch[4]),
        alpha,
      ]);
    }
  }
}

function parseByte(value: string): number {
  return isPercentage(value) ? parseFloat(value) / 100 : parseFloat(value) / 0xFF;
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
