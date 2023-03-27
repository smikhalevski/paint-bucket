import { Color, RGB } from '@paint-bucket/core';
import {
  clamp,
  convertColorIntToComponents,
  convertComponentsToColorInt,
  createAccessor,
  normalizeColorInt,
} from '@paint-bucket/plugin-utils';

const _parseColor = Color.parse;

Color.parse = value => {
  if (typeof value === 'number') {
    return Color.rgb24(value);
  }
  if (Array.isArray(value)) {
    return Color.rgb(value);
  }
  return _parseColor(value);
};

Color.rgb = rgb => new Color().rgb(rgb);

Color.rgb24 = rgb => new Color().rgb24(rgb);

Color.rgb32 = rgb => new Color().rgb32(rgb);

Color.prototype.rgb = createAccessor<RGB, Partial<RGB>>(
  color => {
    const rgb = color.getComponents(RGB);
    return [rgb[0] * 0xff, rgb[1] * 0xff, rgb[2] * 0xff, rgb[3]];
  },

  (color, value) => {
    const rgb = color.useComponents(RGB);
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
  color => convertComponentsToColorInt(color.getComponents(RGB)) >>> 8,

  (color, value) => {
    convertColorIntToComponents(normalizeColorInt(value, 6), color.useComponents(RGB));
  }
);

Color.prototype.rgb32 = createAccessor(
  color => convertComponentsToColorInt(color.getComponents(RGB)),

  (color, value) => {
    convertColorIntToComponents(normalizeColorInt(value, 8), color.useComponents(RGB));
  }
);

Color.prototype.red = createAccessor(
  color => color.getComponents(RGB)[0] * 0xff,

  (color, R) => {
    color.useComponents(RGB)[0] = clamp(R / 0xff);
  }
);

Color.prototype.green = createAccessor(
  color => color.getComponents(RGB)[1] * 0xff,

  (color, G) => {
    color.useComponents(RGB)[1] = clamp(G / 0xff);
  }
);

Color.prototype.blue = createAccessor(
  color => color.getComponents(RGB)[2] * 0xff,

  (color, B) => {
    color.useComponents(RGB)[2] = clamp(B / 0xff);
  }
);

Color.prototype.alpha = createAccessor(
  color => color.getComponents(RGB)[3],

  (color, a) => {
    color.useComponents(RGB)[3] = clamp(a);
  }
);

Color.prototype.brightness = function () {
  const rgb = this.getComponents(RGB);
  return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
};

Color.prototype.luminance = function () {
  const rgb = this.getComponents(RGB);
  return rotate(rgb[0]) * 0.2126 + rotate(rgb[1]) * 0.7152 + rotate(rgb[2]) * 0.0722;
};

function rotate(v: number): number {
  return v > 0.03928 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
}

Color.prototype.contrast = function (color) {
  let a = this.luminance() + 0.05;
  let b = Color.parse(color).luminance() + 0.05;

  return a > b ? a / b : b / a;
};

Color.prototype.mix = function (color, ratio) {
  const rgb1 = this.useComponents(RGB);
  const rgb2 = Color.parse(color).getComponents(RGB);

  ratio = clamp(ratio);

  rgb1[0] += ratio * (rgb2[0] - rgb1[0]);
  rgb1[1] += ratio * (rgb2[1] - rgb1[1]);
  rgb1[2] += ratio * (rgb2[2] - rgb1[2]);

  return this;
};

Color.prototype.greyscale = function () {
  const rgb = this.useComponents(RGB);
  const [R, G, B] = rgb;
  const value = Math.sqrt(R * R * 0.299 + G * G * 0.587 + B * B * 0.114);

  rgb[0] = value;
  rgb[1] = value;
  rgb[2] = value;

  return this;
};
