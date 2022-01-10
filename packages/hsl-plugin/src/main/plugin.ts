import {Color, color} from '@paint-bucket/core';
import {componentsToInt, createAccessor, intToComponents, normalizeComponents} from '@paint-bucket/plugin-utils';
import {Hsl} from '@paint-bucket/hsl';
import {right} from 'numeric-wrench';

function clamp(x: number, n = 0): number {
  x = +x;
  return isNaN(x) ? n : x < 0 ? 0 : x > 1 ? 1 : x;
}

export {_Color as Color};

const _Color = function (Color, color) {

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

        if (H != null) {
          hsl[0] = clamp(H / 360);
        }
        if (S != null) {
          hsl[1] = clamp(S / 100);
        }
        if (L != null) {
          hsl[2] = clamp(L / 100);
        }
        if (a != null) {
          hsl[3] = clamp(a, 1);
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
      function (this: Color, value) {
        this.use(Hsl)[0] = clamp(value / 360);
      },
  );

  colorPrototype.saturation = createAccessor(
      function (this: Color) {
        return this.get(Hsl)[1] * 100;
      },
      function (this: Color, value) {
        this.use(Hsl)[1] = clamp(value / 100);
      },
  );

  colorPrototype.lightness = createAccessor(
      function (this: Color) {
        return this.get(Hsl)[2] * 100;
      },
      function (this: Color, value) {
        this.use(Hsl)[2] = clamp(value / 100);
      },
  );

  return Color;
}(Color, color);
