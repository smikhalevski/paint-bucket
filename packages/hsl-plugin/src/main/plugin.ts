import { Color } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';
import {
  clamp,
  convertColorIntToComponents,
  convertComponentsToColorInt,
  createAccessor,
  normalizeColorInt,
} from '@paint-bucket/plugin-utils';

Color.hsl = hsl => new Color().hsl(hsl);

Color.hsl24 = hsl => new Color().hsl24(hsl);

Color.hsl32 = hsl => new Color().hsl32(hsl);

Color.prototype.hsl = createAccessor<HSL, Partial<HSL>>(
  color => {
    const hsl = color.get(HSL);
    return [hsl[0] * 360, hsl[1] * 100, hsl[2] * 100, hsl[3]];
  },

  (color, value) => {
    const hsl = color.use(HSL);
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
  color => convertComponentsToColorInt(color.get(HSL)) >>> 8,

  (color, value) => {
    convertColorIntToComponents(normalizeColorInt(value, 6), color.use(HSL));
  }
);

Color.prototype.hsl32 = createAccessor(
  color => convertComponentsToColorInt(color.get(HSL)),

  (color, value) => {
    convertColorIntToComponents(normalizeColorInt(value, 8), color.use(HSL));
  }
);

Color.prototype.hue = createAccessor(
  color => color.get(HSL)[0] * 360,

  (color, H) => {
    color.use(HSL)[0] = clamp(H / 360);
  }
);

Color.prototype.saturation = createAccessor(
  color => color.get(HSL)[1] * 100,

  (color, S) => {
    color.use(HSL)[1] = clamp(S / 100);
  }
);

Color.prototype.lightness = createAccessor(
  color => color.get(HSL)[2] * 100,

  (color, L) => {
    color.use(HSL)[2] = clamp(L / 100);
  }
);

Color.prototype.spin = function (H) {
  const hsl = this.use(HSL);
  hsl[0] = clamp(((hsl[0] + H) / 360) % 1);
  return this;
};

Color.prototype.lighten = function (p) {
  const hsl = this.use(HSL);
  hsl[2] = clamp(hsl[2] * (1 + +p));
  return this;
};

Color.prototype.darken = function (p) {
  return this.lighten(-p);
};
