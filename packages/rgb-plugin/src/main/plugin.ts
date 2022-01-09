import {color, Color, ColorLike, Rgb} from '@paint-bucket/core';
import {
  componentsToInt,
  createAccessor,
  intToComponents,
  normalizeComponents,
  toColor,
} from '@paint-bucket/plugin-utils';
import {lerp, right} from 'numeric-wrench';

function clamp(x: number, n = 0): number {
  x = +x;
  return isNaN(x) ? n : x < 0 ? 0 : x > 1 ? 1 : x;
}

Color.overrideParser((next) => (value) => {
  if (typeof value === 'number') {
    return new Color().rgb24(value);
  }
  if (Array.isArray(value)) {
    return new Color().rgb(value as Rgb);
  }
  return next(value);
});

color.rgb = (rgb) => new Color().rgb(rgb);

color.rgb24 = (rgb) => new Color().rgb24(rgb);

color.rgb32 = (rgb) => new Color().rgb32(rgb);

const colorPrototype = Color.prototype;

colorPrototype.rgb = createAccessor<Rgb, Partial<Rgb>>(
    function (this: Color) {
      const rgb = this.get(Rgb);
      return [
        rgb[0] * 0xFF,
        rgb[1] * 0xFF,
        rgb[2] * 0xFF,
        rgb[3],
      ];
    },
    function (this: Color, value) {
      const rgb = this.use(Rgb);
      const [R, G, B, a] = value;

      if (R != null) {
        rgb[0] = clamp(R / 0xFF);
      }
      if (G != null) {
        rgb[1] = clamp(G / 0xFF);
      }
      if (B != null) {
        rgb[2] = clamp(B / 0xFF);
      }
      if (a != null) {
        rgb[3] = clamp(a, 1);
      }
    },
);

colorPrototype.rgb24 = createAccessor(
    function (this: Color) {
      return right(componentsToInt(this.get(Rgb)), 8);
    },
    function (this: Color, value) {
      intToComponents(normalizeComponents(value, 6), this.use(Rgb));
    },
);

colorPrototype.rgb32 = createAccessor(
    function (this: Color) {
      return componentsToInt(this.get(Rgb));
    },
    function (this: Color, value) {
      intToComponents(normalizeComponents(value, 8), this.use(Rgb));
    },
);

colorPrototype.red = createAccessor(
    function (this: Color) {
      return this.get(Rgb)[0] * 0xFF;
    },
    function (this: Color, value) {
      this.use(Rgb)[0] = clamp(value / 0xFF);
    },
);

colorPrototype.green = createAccessor(
    function (this: Color) {
      return this.get(Rgb)[1] * 0xFF;
    },
    function (this: Color, value) {
      this.use(Rgb)[1] = clamp(value / 0xFF);
    },
);

colorPrototype.blue = createAccessor(
    function (this: Color) {
      return this.get(Rgb)[2] * 0xFF;
    },
    function (this: Color, value) {
      this.use(Rgb)[2] = clamp(value / 0xFF);
    },
);

colorPrototype.alpha = createAccessor(
    function (this: Color) {
      return this.get(Rgb)[3];
    },
    function (this: Color, value) {
      this.use(Rgb)[3] = clamp(value, 1);
    },
);

colorPrototype.brightness = function (this: Color) {
  const rgb = this.get(Rgb);
  return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
};

colorPrototype.luminance = function (this: Color) {
  const rgb = this.get(Rgb);
  return rotateComponent(rgb[0]) * 0.2126 + rotateComponent(rgb[1]) * 0.7152 + rotateComponent(rgb[2]) * 0.0722;
};

function rotateComponent(v: number): number {
  return v > 0.03928 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
}

colorPrototype.contrast = function (this: Color, color: ColorLike) {
  const L1 = this.luminance();
  const L2 = toColor(color).luminance();

  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
};

colorPrototype.mix = function (this: Color, color, ratio) {
  const rgb1 = this.use(Rgb);
  const rgb2 = toColor(color).get(Rgb);

  ratio = clamp(ratio);

  rgb1[0] = lerp(ratio, rgb1[0], rgb2[0]);
  rgb1[1] = lerp(ratio, rgb1[1], rgb2[1]);
  rgb1[2] = lerp(ratio, rgb1[2], rgb2[2]);

  return this;
};

colorPrototype.greyscale = function (this: Color) {
  const rgb = this.use(Rgb);
  const [R, G, B] = rgb;
  const value = Math.sqrt(R * R * 0.299 + G * G * 0.587 + B * B * 0.114);

  rgb[0] = value;
  rgb[1] = value;
  rgb[2] = value;

  return this;
};
