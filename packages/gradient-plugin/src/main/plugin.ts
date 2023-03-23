import { Color, Gradient, RGB } from '@paint-bucket/core';
import { lerp, range, sort, swap } from 'algomatic';

const domainCache = new Map<number, number[]>();

for (let i = 0; i < 10; ++i) {
  domainCache.set(i, range(i));
}

const domain2 = [0, 1];

Color.gradient = (colors, domain) => {
  if (!domain) {
    return new Gradient(colors.map(Color.parse), domainCache.get(colors.length) || range(colors.length));
  }

  const domainLength = Math.min(colors.length, domain.length);
  const mappedColors: Color[] = [];

  for (let i = 0; i < domainLength; ++i) {
    mappedColors.push(Color.parse(colors[i]));
  }

  domain = domain.slice(0, domainLength);
  sort(domain, (i, j) => swap(mappedColors, i, j));

  return new Gradient(mappedColors, domain);
};

Gradient.prototype.at = function (this: Gradient, x, model = RGB, interpolatorFactory = lerp) {
  return new Color(model, this.get(model, x, interpolatorFactory).slice(0));
};

Gradient.prototype.palette = function (this: Gradient, n, model = RGB) {
  const colors: Color[] = [];

  const x0 = this['domain'][0];
  const x1 = this['domain'][this['domain'].length - 1];
  const dx = x1 - x0;

  for (let i = 0; i < n; ++i) {
    colors.push(this.at(x0 + (i / (n - 1)) * dx, model));
  }
  return colors;
};

Color.prototype.gradient = function (color) {
  return new Gradient([this, Color.parse(color)], domain2);
};
