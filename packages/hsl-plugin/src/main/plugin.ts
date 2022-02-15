import {Color, color} from '@paint-bucket/core';
import {componentsToInt, createAccessor, intToComponents, normalizeComponents} from '@paint-bucket/plugin-utils';
import {Hsl} from '@paint-bucket/hsl';
import {clamp1, cycle, isNumeric, right} from 'algomatic';

color.hsl = (hsl) => new Color().hsl(hsl);

color.hsl24 = (hsl) => new Color().hsl24(hsl);

color.hsl32 = (hsl) => new Color().hsl32(hsl);

const colorPrototype = Color.prototype;

colorPrototype.hsl = createAccessor<Hsl, Partial<Hsl>>(
    function (this: Color) {
      const hsl = this.get(Hsl);
      return [
        hsl[0] * 360,
        hsl[1] * 100,
        hsl[2] * 100,
        hsl[3],
      ];
    },
    function (this: Color, value) {
      const hsl = this.use(Hsl);
      const [H, S, L, a] = value;

      if (isNumeric(H)) {
        hsl[0] = clamp1(cycle(H / 360, 0, 1));
      }
      if (isNumeric(S)) {
        hsl[1] = clamp1(S / 100);
      }
      if (isNumeric(L)) {
        hsl[2] = clamp1(L / 100);
      }
      if (isNumeric(a)) {
        hsl[3] = clamp1(a);
      }
    },
);

colorPrototype.hsl24 = createAccessor(
    function (this: Color) {
      return right(componentsToInt(this.get(Hsl)), 8);
    },
    function (this: Color, value) {
      intToComponents(normalizeComponents(value, 6), this.use(Hsl));
    },
);

colorPrototype.hsl32 = createAccessor(
    function (this: Color) {
      return componentsToInt(this.get(Hsl));
    },
    function (this: Color, value) {
      intToComponents(normalizeComponents(value, 8), this.use(Hsl));
    },
);

colorPrototype.hue = createAccessor(
    function (this: Color) {
      return this.get(Hsl)[0] * 360;
    },
    function (this: Color, H) {
      if (isNumeric(H)) {
        this.use(Hsl)[0] = clamp1(H / 360);
      }
    },
);

colorPrototype.saturation = createAccessor(
    function (this: Color) {
      return this.get(Hsl)[1] * 100;
    },
    function (this: Color, S) {
      if (isNumeric(S)) {
        this.use(Hsl)[1] = clamp1(S / 100);
      }
    },
);

colorPrototype.lightness = createAccessor(
    function (this: Color) {
      return this.get(Hsl)[2] * 100;
    },
    function (this: Color, L) {
      if (isNumeric(L)) {
        this.use(Hsl)[2] = clamp1(L / 100);
      }
    },
);

colorPrototype.spin = function (this: Color, H) {
  if (isNumeric(H)) {
    const hsl = this.use(Hsl);
    hsl[0] = cycle(hsl[0] + H / 360, 0, 1);
  }
  return this;
};

colorPrototype.lighten = function (this: Color, p) {
  if (isNumeric(p)) {
    const hsl = this.use(Hsl);
    hsl[2] = clamp1(hsl[2] * (1 + +p));
  }
  return this;
};

colorPrototype.darken = function (this: Color, p) {
  return this.lighten(-p);
};
