import {Color, color, Rgb} from '@paint-bucket/core';
import {Gradient} from '@paint-bucket/gradient';
import {toColor} from '@paint-bucket/plugin-utils';

const unitaryDomain = [0, 1];

color.gradient = (colors, domain) => new Gradient(colors.map(Color.parser), domain);

const gradientPrototype = Gradient.prototype;

gradientPrototype.at = function (this: Gradient, value) {
  return new Color(Rgb, this.getAt(Rgb, value).slice(0));
};

const colorPrototype = Color.prototype;

colorPrototype.linearGradient = function (this: Color, stopColor) {
  return new Gradient([this.clone(), Color.parser(stopColor)], unitaryDomain);
};
