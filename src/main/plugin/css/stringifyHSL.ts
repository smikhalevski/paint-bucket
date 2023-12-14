import type { Color } from '../../core';
import { HSL } from '../../color-model/hsl';

const { round } = Math;

export function stringifyHSL(color: Color): string {
  const components = color.getComponents(HSL);

  const H = round(components[0] * 360);
  const S = round(components[1] * 100);
  const L = round(components[2] * 100);
  const a = round(components[3] * 100) / 100;

  if (a === 1) {
    return `hsl(${H},${S}%,${L}%)`;
  } else {
    return `hsla(${H},${S}%,${L}%,${a})`;
  }
}
