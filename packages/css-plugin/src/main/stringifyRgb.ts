import {componentsToInt} from '@paint-bucket/plugin-utils';
import {right} from 'numeric-wrench';

export function stringifyRgb(rgb: readonly number[]): string {
  const [R, G, B, a] = rgb;

  if (a === 1) {
    const str = right(componentsToInt(rgb), 8).toString(16);
    return str.length === 6 ? '#' + str : '#000000'.substr(0, 7 - str.length) + str;
  }

  return `rgba(${Math.round(R * 0xFF)},${Math.round(G * 0xFF)},${Math.round(B * 0xFF)},${a.toFixed(2)})`;
}
