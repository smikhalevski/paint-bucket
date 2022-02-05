import {Color, color, Gradient, Rgb} from '@paint-bucket/core';
import {toColor} from '@paint-bucket/plugin-utils';
import {parallelSort, range, swap} from 'numeric-wrench';

const domainCache = new Map<number, number[]>();

for (let i = 0; i < 10; ++i) {
  domainCache.set(i, range(i));
}

const domain2 = [0, 1];

color.gradient = (inputColors, domain) => {
  const colors = inputColors.map(toColor);

  if (domain) {
    domain = domain.slice(0);
    parallelSort(domain, (i, j) => swap(colors, i, j));
  } else {
    domain = domainCache.get(colors.length) || range(colors.length);
  }
  return new Gradient(colors, domain);
};

const gradientPrototype = Gradient.prototype;

gradientPrototype.at = function (this: Gradient, x, model = Rgb) {
  return new Color(model, this.get(model, x).slice(0));
};

gradientPrototype.palette = function (this: Gradient, n, model = Rgb) {
  const {domain} = this;
  const colors: Color[] = [];

  const minimum = domain[0];
  const maximum = domain[domain.length - 1];
  const d = maximum - minimum;

  for (let i = 0; i < n; ++i) {
    colors.push(this.at(minimum + i / (n - 1) * d, model));
  }
  return colors;
};

const colorPrototype = Color.prototype;

colorPrototype.gradient = function (this: Color, color) {
  return new Gradient([this, toColor(color)], domain2);
};
