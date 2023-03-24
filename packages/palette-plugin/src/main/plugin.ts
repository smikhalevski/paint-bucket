import { Color } from '@paint-bucket/core';
import { HSL } from '@paint-bucket/hsl';
import { HSV } from '@paint-bucket/hsv';

Color.prototype.complement = function () {
  const [H, S, L, a] = this.getComponents(HSL);

  return new Color(HSL, [(H + 0.5) % 1, S, L, a]);
};

Color.prototype.triad = function () {
  const [H, S, L, a] = this.getComponents(HSL);

  return [
    new Color(HSL, [H, S, L, a]),
    new Color(HSL, [(H + 1 / 3) % 1, S, L, a]),
    new Color(HSL, [(H + 2 / 3) % 1, S, L, a]),
  ];
};

Color.prototype.tetrad = function () {
  const [H, S, L, a] = this.getComponents(HSL);

  return [
    new Color(HSL, [H, S, L, a]),
    new Color(HSL, [(H + 1 / 4) % 1, S, L, a]),
    new Color(HSL, [(H + 2 / 4) % 1, S, L, a]),
    new Color(HSL, [(H + 3 / 4) % 1, S, L, a]),
  ];
};

Color.prototype.splitComplement = function () {
  const [H, S, L, a] = this.getComponents(HSL);

  return [
    new Color(HSL, [H, S, L, a]),
    new Color(HSL, [(H + 0.2) % 1, S, L, a]),
    new Color(HSL, [(H + 0.6) % 1, S, L, a]),
  ];
};

Color.prototype.analogous = function (n = 6, slices = 30) {
  const [H, S, L, a] = this.getComponents(HSL);

  const part = 1 / slices;
  const colors = [new Color(HSL, [H, S, L, a])];

  let nextH = (H - (part * n) / 2 + 2) % 1;

  while (--n > 0) {
    nextH = (nextH + part) % 1;
    colors.push(new Color(HSL, [nextH, S, L, a]));
  }
  return colors;
};

Color.prototype.monochromatic = function (n = 6) {
  const [H, S, V, a] = this.getComponents(HSV);

  const colors: Color[] = [];
  const deltaV = 1 / n;

  let nextV = V;

  while (n-- > 0) {
    colors.push(new Color(HSV, [H, S, nextV, a]));
    nextV = (nextV + deltaV) % 1;
  }

  return colors;
};
