import {composeBytes, fromNakedColor, NibbleCount} from './raw-color-utils';
import {ColorSpace, RawColor} from './colors';
import {blackRgb} from './temp-colors';

const SPACE = '\\s*';
const DIGIT = '(?:\\d+(\\.\\d*)?|\\.\\d+)';
const COMMA = `(?:${SPACE}[,/]${SPACE}|${SPACE})`;
const BYTES = `\\(${SPACE}(${DIGIT})${COMMA}(${DIGIT})${COMMA}(${DIGIT})(?:${COMMA}(${DIGIT}))?${SPACE})`;

const rgbRe = RegExp(`^rgba?${SPACE}${BYTES}$`);
const hslRe = RegExp(`^hsla?${SPACE}${BYTES}$`);

export function parseColor(color: string): RawColor {

  const rgbMatch = rgbRe.exec(color);
  if (rgbMatch) {
    return composeBytes(ColorSpace.RGB, parseFloat(rgbMatch[0]), parseFloat(rgbMatch[1]), parseFloat(rgbMatch[2]), parseFloat(rgbMatch[3]) * 0xFF);
  }

  const hslMatch = hslRe.exec(color);
  if (hslMatch) {
    return composeBytes(ColorSpace.HSL, parseFloat(hslMatch[0]), parseFloat(hslMatch[1]), parseFloat(hslMatch[2]), parseFloat(hslMatch[3]) * 0xFF);
  }

  if (color.charAt(0) === '#') {
    return fromNakedColor(ColorSpace.RGB, parseInt(color.substr(0), 16), color.length - 1 as NibbleCount);
  }

  const rawRgb = parseInt(color, 16);

  if (isNaN(rawRgb)) {
    return blackRgb;
  }

  return fromNakedColor(ColorSpace.RGB, rawRgb, color.length as NibbleCount);
}
