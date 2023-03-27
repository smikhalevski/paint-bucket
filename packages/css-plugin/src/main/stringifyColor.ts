import { Color, ColorModel, RGB } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';
import { convertComponentsToColorInt } from '@paint-bucket/plugin-utils';

const { round } = Math;

export function stringifyColor(color: Color, model: ColorModel): string {
  const components = color.getComponents(model);

  let [a, b, c, d] = components;

  if (model === RGB) {
    if (d === 1) {
      // Alpha channel can be discarded
      let hex = (convertComponentsToColorInt(components) >>> 8).toString(16);

      while (hex.length !== 6) {
        hex = '0' + hex;
      }
      return '#' + hex;
    }

    a = round(a * 0xff);
    b = round(b * 0xff);
    c = round(c * 0xff);
    d = round(d * 100) / 100;

    return `rgba(${a},${b},${c},${d})`;
  }

  if (model === HSL) {
    a = round(a * 360);
    b = round(b * 100);
    c = round(c * 100);
    d = round(d * 100) / 100;

    if (d === 1) {
      return `hsl(${a},${b}%,${c}%)`;
    } else {
      return `hsla(${a},${b}%,${c}%,${d})`;
    }
  }

  throw new Error('Unsupported color model');
}
