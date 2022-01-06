import {
  color,
  Color,
  ColorLike,
  composeComponents,
  createAccessor,
  createComponentAccessor,
  getColorComponent,
  hasProperty,
  normalizeComponents,
  Rgb,
  toColor,
} from '@paint-bucket/core';
import {lerp, right} from 'numeric-wrench';
import './plugin-types';
import {RgbObject} from './plugin-types';
import {intToRgb, rgbToInt} from './plugin-utils';


Color.overrideFactory((prevFactory) => (value) => {
  if (Array.isArray(value)) {
    return new Color().rgb(value as Rgb);
  }
  if (hasProperty(value, 'R', 'G', 'B', 'a')) {
    return new Color().rgbObject(value as RgbObject);
  }
  return prevFactory(value);
});


color.rgb = (rgb) => {
  if (Array.isArray(rgb)) {
    const [R = 0, G = 0, B = 0, a = 1] = rgb;
    return new Color().rgb([R, G, B, a]);
  } else {
    const {R = 0, G = 0, B = 0, a = 1} = rgb;
    return new Color().rgb([R, G, B, a]);
  }
};

color.rgb24 = (rgb) => new Color().rgb24(rgb);

color.rgb32 = (rgb) => new Color().rgb32(rgb);


const colorPrototype = Color.prototype;

colorPrototype.rgb = createAccessor(
    (color) => {
      const rgb = color.get(Rgb);
      return [
        rgb[0] * 0xFF,
        rgb[1] * 0xFF,
        rgb[2] * 0xFF,
        rgb[3],
      ];
    },
    (color, value) => {
      const rgb = color.use(Rgb);
      rgb[0] = value[0] / 0xFF;
      rgb[1] = value[1] / 0xFF;
      rgb[2] = value[2] / 0xFF;
      rgb[3] = value[3];
    },
);

colorPrototype.rgb24 = createAccessor(
    (color) => right(rgbToInt(color.get(Rgb)), 8),
    (color, value) => {
      intToRgb(normalizeComponents(value, 6), color.use(Rgb));
    },
);

colorPrototype.rgb32 = createAccessor(
    (color) => rgbToInt(color.get(Rgb)),
    (color, value) => {
      intToRgb(normalizeComponents(value, 8), color.use(Rgb));
    },
);

colorPrototype.rgbObject = createAccessor(
    (color) => {
      const rgb = color.get(Rgb);
      return {
        R: rgb[0] * 0xFF,
        G: rgb[1] * 0xFF,
        B: rgb[2] * 0xFF,
        a: rgb[3],
      };
    },
    (color, value) => {
      const rgb = color.use(Rgb);

      rgb[0] = value.R / 0xFF;
      rgb[1] = value.G / 0xFF;
      rgb[2] = value.B / 0xFF;
      rgb[3] = value.a;
    },
);

colorPrototype.red = createComponentAccessor(Rgb, 0);

colorPrototype.green = createComponentAccessor(Rgb, 1);

colorPrototype.blue = createComponentAccessor(Rgb, 2);

colorPrototype.alpha = createComponentAccessor(Rgb, 3);

colorPrototype.brightness = createAccessor(
    (color) => {
      const rgb = color.get(Rgb);
      return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
    },
    (color, value) => {
      const rgb = color.use(Rgb);
      const ratio = color.brightness() / value;

      rgb[0] *= ratio;
      rgb[1] *= ratio;
      rgb[2] *= ratio;
    },
);

colorPrototype.luminance = function (this: Color) {
  const rgb = this.get(Rgb);
  return rotateLuminance(rgb[0]) * 0.2126 + rotateLuminance(rgb[1]) * 0.7152 + rotateLuminance(rgb[2]) * 0.0722;
};

function rotateLuminance(v: number): number {
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
