import { convertComponentsToColorInt } from '@paint-bucket/plugin-utils';

export function stringifyRGB(rgb: readonly number[]): string {
  const a = rgb[3];

  if (a === 1) {
    let str = (convertComponentsToColorInt(rgb) >>> 8).toString(16);
    while (str.length !== 6) {
      str = '0' + str;
    }
    return '#' + str;
  }

  const R = (rgb[0] * 0xff) | 0;
  const G = (rgb[1] * 0xff) | 0;
  const B = (rgb[2] * 0xff) | 0;

  return `rgba(${R},${G},${B},${((a * 100) | 0) / 100}`;
}
