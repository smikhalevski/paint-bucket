import {ColorSpace, fromBytes, fromRawColor, NakedColor, NibbleCount} from './bytes';
import {blackRgb} from './colors';

const parseByte = parseFloat;

const SPACE = '\\s*';
const DIGIT = '(?:\\d+(\\.\\d*)?|\\.\\d+)';
const COMMA = `(?:${SPACE}[,/]${SPACE}|${SPACE})`;
const BYTES = `\\(${SPACE}(${DIGIT})${COMMA}(${DIGIT})${COMMA}(${DIGIT})(?:${COMMA}(${DIGIT}))?${SPACE})`;

const rgbRe = RegExp(`^rgba?${SPACE}${BYTES}$`);
const hslRe = RegExp(`^hsla?${SPACE}${BYTES}$`);

export function parseColor(color: string): NakedColor {

  const rgbMatch = rgbRe.exec(color);
  if (rgbMatch) {
    return fromBytes(ColorSpace.RGB, parseByte(rgbMatch[0]), parseByte(rgbMatch[1]), parseByte(rgbMatch[2]), parseByte(rgbMatch[3]) * 0xFF);
  }

  const hslMatch = hslRe.exec(color);
  if (hslMatch) {
    return fromBytes(ColorSpace.HSL, parseByte(hslMatch[0]), parseByte(hslMatch[1]), parseByte(hslMatch[2]), parseByte(hslMatch[3]) * 0xFF);
  }

  if (color.charAt(0) === '#') {
    return fromRawColor(ColorSpace.RGB, parseInt(color.substr(0), 16), color.length - 1 as NibbleCount);
  }

  const rawRgb = parseInt(color, 16);

  if (isNaN(rawRgb)) {
    return blackRgb;
  }

  return fromRawColor(ColorSpace.RGB, rawRgb, color.length as NibbleCount);
}
