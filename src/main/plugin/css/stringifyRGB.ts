import { Color } from '../../Color';
import { RGB } from '../../rgb';

const { round } = Math;

export function stringifyRGB(color: Color): string {
  const components = color.getComponents(RGB);

  const R = round(components[0] * 0xff);
  const G = round(components[1] * 0xff);
  const B = round(components[2] * 0xff);
  const a = round(components[3] * 100) / 100;

  if (a === 1) {
    return `rgb(${R},${G},${B})`;
  } else {
    return `rgba(${R},${G},${B},${a})`;
  }
}
