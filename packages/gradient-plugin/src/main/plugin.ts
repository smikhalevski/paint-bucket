import {Color, color, Gradient, Rgb} from '@paint-bucket/core';
import {toColor} from '@paint-bucket/plugin-utils';
import {lerp, range, sort, swap} from 'algomatic';

const domainCache = new Map<number, number[]>();

for (let i = 0; i < 10; ++i) {
  domainCache.set(i, range(i));
}

const domain2 = [0, 1];

color.gradient = (colors, domain) => {
  if (!domain) {
    return new Gradient(colors.map(toColor), domainCache.get(colors.length) || range(colors.length));
  }

  const domainLength = Math.min(colors.length, domain.length);
  const mappedColors: Color[] = [];

  for (let i = 0; i < domainLength; ++i) {
    mappedColors.push(toColor(colors[i]));
  }

  domain = domain.slice(0, domainLength);
  sort(domain, (i, j) => swap(mappedColors, i, j));

  return new Gradient(mappedColors, domain);
};

const gradientPrototype = Gradient.prototype;

gradientPrototype.at = function (this: Gradient, x, model = Rgb, interpolatorFactory = lerp) {
  return new Color(model, this.get(model, x, interpolatorFactory).slice(0));
};

gradientPrototype.palette = function (this: Gradient, n, model = Rgb) {
  const {domain} = this;
  const colors: Color[] = [];

  const x0 = domain[0];
  const x1 = domain[domain.length - 1];
  const dx = x1 - x0;

  for (let i = 0; i < n; ++i) {
    colors.push(this.at(x0 + i / (n - 1) * dx, model));
  }
  return colors;
};

const colorPrototype = Color.prototype;

colorPrototype.gradient = function (this: Color, color) {
  return new Gradient([this, toColor(color)], domain2);
};
