import { convertComponentsToColorInt } from '@paint-bucket/plugin-utils';

export function stringifyRGB(rgb: readonly number[]): string {
  const [R, G, B, a] = rgb;

  if (a === 1) {
    const str = (convertComponentsToColorInt(rgb) >>> 8).toString(16);
    return str.length === 6 ? '#' + str : '#000000'.substr(0, 7 - str.length) + str;
  }

  return `rgba(${(R * 0xff) | 0},${(G * 0xff) | 0},${(B * 0xff) | 0},${((a * 100) | 0) / 100})`;
}
