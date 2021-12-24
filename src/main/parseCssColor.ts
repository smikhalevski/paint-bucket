import {composeBytes, fromNakedColor} from './raw-color-utils';
import {ColorSpace, RawColor} from './colors';
import {FF} from './int64';
import {floatOrZero, intOrZero} from './math';

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

export function parseCssColor(cssColor: string): RawColor {

  cssColor = cssColor.trim();

  if (cssColor.charCodeAt(0) === 35 /* # */) {
    return fromNakedColor(ColorSpace.RGB, intOrZero(cssColor.substr(1), 16), cssColor.length - 1);
  }

  const nakedRgb = parseInt(cssColor, 16);

  if (!isNaN(nakedRgb)) {
    return fromNakedColor(ColorSpace.RGB, nakedRgb, cssColor.length);
  }

  const tupleMatch = tupleRe.exec(cssColor);

  if (tupleMatch) {
    const colorSpaceName = tupleMatch[1].toLowerCase();

    const a = parseByte(tupleMatch[2]);
    const b = parseByte(tupleMatch[3]);
    const c = parseByte(tupleMatch[4]);
    const d = parseAlpha(tupleMatch[5]);

    if (colorSpaceName === 'rgb' || colorSpaceName === 'rgba') {
      return composeBytes(ColorSpace.RGB, a, b, c, d);
    }
    if (colorSpaceName === 'hsl' || colorSpaceName === 'hsla') {
      return composeBytes(ColorSpace.HSL, a, b, c, d);
    }
  }

  throw new Error('Illegal color format: ' + cssColor);
}

function parseByte(value: string): number {
  return isPercentage(value) ? floatOrZero(value) / 100 * FF : floatOrZero(value);
}

function parseAlpha(value: string | undefined): number {
  return value === undefined ? FF : isPercentage(value) ? floatOrZero(value) / 100 * FF : floatOrZero(value) * FF;
}

function isPercentage(value: string): boolean {
  return value.charCodeAt(value.length - 1) === 37; /* % */
}
