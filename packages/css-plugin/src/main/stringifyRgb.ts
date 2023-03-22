import { componentsToInt } from '@paint-bucket/plugin-utils';
import { right } from 'algomatic';

export function stringifyRgb(rgb: readonly number[]): string {
  const [R, G, B, a] = rgb;

  if (a === 1) {
    const str = right(componentsToInt(rgb), 8).toString(16);
    return str.length === 6 ? '#' + str : '#000000'.substr(0, 7 - str.length) + str;
  }

  return `rgba(${(R * 0xff) | 0},${(G * 0xff) | 0},${(B * 0xff) | 0},${((a * 100) | 0) / 100})`;
}
