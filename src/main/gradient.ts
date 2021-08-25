import {rgb, toRgb} from './color-utils';
import {ColorLike, IRgb} from './color-types';

export interface IGradientStop {
  color: IRgb;
  value: number;
}

/**
 * Returns color at `value` in the gradient that consists of `stops`.
 */
export function gradient(stops: Array<IGradientStop>, value: number): IRgb {
  if (stops.length === 0) {
    return rgb(0, 0, 0);
  }

  const n = stops.length;

  if (value <= stops[0].value) {
    return stops[0].color;
  }
  if (value >= stops[n - 1].value) {
    return stops[n - 1].color;
  }

  let i = 0;
  while (value > stops[i].value) {
    i++;
  }

  const s2 = stops[i];
  const s1 = stops[i - 1];

  const c1 = s1.color;
  const c2 = s2.color;

  const r = (value - s1.value) / (s2.value - s1.value);

  return rgb(
      c1.r + (c2.r - c1.r) * r,
      c1.g + (c2.g - c1.g) * r,
      c1.b + (c2.b - c1.b) * r,
      c1.alpha + (c2.alpha - c1.alpha) * r,
  );
}

export function gradientStop(color: ColorLike, value: number): IGradientStop {
  return {
    color: toRgb(color),
    value,
  };
}
