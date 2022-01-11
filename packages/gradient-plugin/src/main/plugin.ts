import {Color, color, Rgb} from '@paint-bucket/core';
import {Gradient} from '@paint-bucket/gradient';
import {toColor} from '@paint-bucket/plugin-utils';

color.gradient = (colors, domain) => new Gradient(colors.map(toColor), domain);

const gradientPrototype = Gradient.prototype;

gradientPrototype.rgbAt = function (this: Gradient, x) {
  return new Color(Rgb, this.at(x).slice(0));
};

gradientPrototype.palette = function (this: Gradient, n) {
  const colors: Color[] = [];
  const a = Math.min(...this.domain);
  const b = Math.max(...this.domain);

  for (let i = 0; i < n; ++i) {
    colors.push(this.rgbAt(a + (b - a)));
  }
  return colors;
};

const colorPrototype = Color.prototype;

colorPrototype.gradient = function (this: Color, stopColor) {
  return new Gradient([this, toColor(stopColor)]);
};
