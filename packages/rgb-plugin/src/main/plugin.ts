import { Color, Rgb } from '@paint-bucket/core';
import {
  clamp,
  componentsToInt,
  createAccessor,
  enhanceColorParse,
  intToComponents,
  normalizeComponents,
} from '@paint-bucket/plugin-utils';
import { right } from 'algomatic';

enhanceColorParse(next => value => {
  if (typeof value === 'number') {
    return Color.rgb24(value);
  }
  if (Array.isArray(value)) {
    return Color.rgb(value);
  }
  return next(value);
});

Color.rgb = rgb => new Color().rgb(rgb);

Color.rgb24 = rgb => new Color().rgb24(rgb);

Color.rgb32 = rgb => new Color().rgb32(rgb);

Color.prototype.rgb = createAccessor<Rgb, Partial<Rgb>>(
  color => {
    const rgb = color.get(Rgb);
    return [rgb[0] * 0xff, rgb[1] * 0xff, rgb[2] * 0xff, rgb[3]];
  },

  (color, value) => {
    const rgb = color.use(Rgb);
    const [R, G, B, a] = value;

    if (R !== undefined) {
      rgb[0] = clamp(R / 0xff);
    }
    if (G !== undefined) {
      rgb[1] = clamp(G / 0xff);
    }
    if (B !== undefined) {
      rgb[2] = clamp(B / 0xff);
    }
    if (a !== undefined) {
      rgb[3] = clamp(a);
    }
  }
);

Color.prototype.rgb24 = createAccessor(
  color => right(componentsToInt(color.get(Rgb)), 8),

  (color, value) => {
    intToComponents(normalizeComponents(value, 6), color.use(Rgb));
  }
);

Color.prototype.rgb32 = createAccessor(
  color => componentsToInt(color.get(Rgb)),

  (color, value) => {
    intToComponents(normalizeComponents(value, 8), color.use(Rgb));
  }
);

Color.prototype.red = createAccessor(
  color => color.get(Rgb)[0] * 0xff,

  (color, R) => {
    color.use(Rgb)[0] = clamp(R / 0xff);
  }
);

Color.prototype.green = createAccessor(
  color => color.get(Rgb)[1] * 0xff,

  (color, G) => {
    color.use(Rgb)[1] = clamp(G / 0xff);
  }
);

Color.prototype.blue = createAccessor(
  color => color.get(Rgb)[2] * 0xff,

  (color, B) => {
    color.use(Rgb)[2] = clamp(B / 0xff);
  }
);

Color.prototype.alpha = createAccessor(
  color => color.get(Rgb)[3],

  (color, a) => {
    color.use(Rgb)[3] = clamp(a);
  }
);

Color.prototype.brightness = function () {
  const rgb = this.get(Rgb);
  return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
};

Color.prototype.luminance = function () {
  const rgb = this.get(Rgb);
  return rotate(rgb[0]) * 0.2126 + rotate(rgb[1]) * 0.7152 + rotate(rgb[2]) * 0.0722;
};

function rotate(v: number): number {
  return v > 0.03928 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
}

Color.prototype.contrast = function (color) {
  let a = 0.05 + this.luminance();
  let b = 0.05 + Color.parse(color).luminance();

  return a < b ? a / b : b / a;
};

Color.prototype.mix = function (color, ratio) {
  const rgb1 = this.use(Rgb);
  const rgb2 = Color.parse(color).get(Rgb);

  ratio = clamp(ratio);

  rgb1[0] += ratio * (rgb2[0] - rgb1[0]);
  rgb1[1] += ratio * (rgb2[1] - rgb1[1]);
  rgb1[2] += ratio * (rgb2[2] - rgb1[2]);

  return this;
};

Color.prototype.greyscale = function () {
  const rgb = this.use(Rgb);
  const [R, G, B] = rgb;
  const value = Math.sqrt(R * R * 0.299 + G * G * 0.587 + B * B * 0.114);

  rgb[0] = value;
  rgb[1] = value;
  rgb[2] = value;

  return this;
};
