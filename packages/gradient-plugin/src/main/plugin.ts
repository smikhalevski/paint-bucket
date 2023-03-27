import { Color, Gradient, RGB } from '@paint-bucket/core';
import { lerp, range, sort, swap } from 'algomatic';

Color.gradient = (colors, domain) => {
  if (domain) {
    if (colors.length > domain.length) {
      colors = colors.slice(0, domain.length);
    }
    domain = domain.slice(0, colors.length);
  } else {
    domain = range(colors.length);
  }

  colors = colors.map(Color.parse);

  sort(domain, (i, j) => {
    swap(colors, i, j);
  });

  return new Gradient(colors as Color[], domain);
};

Color.prototype.gradient = function (color) {
  return new Gradient([this, Color.parse(color)], [0, 1]);
};

Gradient.prototype.at = function (x, model = RGB, interpolatorFactory = lerp) {
  return new Color(model, this.getComponents(model, x, interpolatorFactory).slice(0));
};

Gradient.prototype.palette = function (n, model = RGB) {
  const { domain } = this;

  const colors = [];

  const x0 = domain[0];
  const dx = domain[domain.length - 1] - x0;

  for (let i = 0; i < n; ++i) {
    colors.push(this.at(x0 + (i / (n - 1)) * dx, model));
  }
  return colors;
};
