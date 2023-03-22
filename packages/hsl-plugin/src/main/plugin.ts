import { Color } from '@paint-bucket/core';
import {
  clamp,
  componentsToInt,
  createAccessor,
  intToComponents,
  normalizeComponents,
} from '@paint-bucket/plugin-utils';
import { Hsl } from '@paint-bucket/hsl';
import { right } from 'algomatic';

Color.hsl = hsl => new Color().hsl(hsl);

Color.hsl24 = hsl => new Color().hsl24(hsl);

Color.hsl32 = hsl => new Color().hsl32(hsl);

Color.prototype.hsl = createAccessor<Hsl, Partial<Hsl>>(
  color => {
    const hsl = color.get(Hsl);
    return [hsl[0] * 360, hsl[1] * 100, hsl[2] * 100, hsl[3]];
  },

  (color, value) => {
    const hsl = color.use(Hsl);
    const [H, S, L, a] = value;

    if (H !== undefined) {
      hsl[0] = clamp((H / 360) % 1);
    }
    if (S !== undefined) {
      hsl[1] = clamp(S / 100);
    }
    if (L !== undefined) {
      hsl[2] = clamp(L / 100);
    }
    if (a !== undefined) {
      hsl[3] = clamp(a);
    }
  }
);

Color.prototype.hsl24 = createAccessor(
  color => right(componentsToInt(color.get(Hsl)), 8),

  (color, value) => {
    intToComponents(normalizeComponents(value, 6), color.use(Hsl));
  }
);

Color.prototype.hsl32 = createAccessor(
  color => componentsToInt(color.get(Hsl)),

  (color, value) => {
    intToComponents(normalizeComponents(value, 8), color.use(Hsl));
  }
);

Color.prototype.hue = createAccessor(
  color => color.get(Hsl)[0] * 360,

  (color, H) => {
    color.use(Hsl)[0] = clamp(H / 360);
  }
);

Color.prototype.saturation = createAccessor(
  color => color.get(Hsl)[1] * 100,

  (color, S) => {
    color.use(Hsl)[1] = clamp(S / 100);
  }
);

Color.prototype.lightness = createAccessor(
  color => color.get(Hsl)[2] * 100,

  (color, L) => {
    color.use(Hsl)[2] = clamp(L / 100);
  }
);

Color.prototype.spin = function (H) {
  const hsl = this.use(Hsl);
  hsl[0] = clamp(((hsl[0] + H) / 360) % 1);
  return this;
};

Color.prototype.lighten = function (p) {
  const hsl = this.use(Hsl);
  hsl[2] = clamp(hsl[2] * (1 + +p));
  return this;
};

Color.prototype.darken = function (p) {
  return this.lighten(-p);
};
