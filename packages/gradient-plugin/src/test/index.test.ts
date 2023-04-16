import { Color, RGB } from '@paint-bucket/core';
import gradientPlugin from '../main';

Color.applyPlugin(gradientPlugin);

describe('at', () => {
  test('returns a color instance at position', () => {
    const color1 = Color.gradient([new Color(), new Color(RGB, [1, 1, 1, 1])]).at(0.5);
    const color2 = new Color().gradient(new Color(RGB, [1, 1, 1, 1])).at(0.5);

    expect(color1).toEqual(new Color(RGB, [0.5, 0.5, 0.5, 1]));
    expect(color2).toEqual(new Color(RGB, [0.5, 0.5, 0.5, 1]));
  });

  test('supports unsorted domains', () => {
    const color1 = Color.gradient(
      [new Color(), new Color(RGB, [1, 0, 0, 1]), new Color(RGB, [1, 1, 1, 1])],
      [2, 0, 1]
    ).at(0.5);

    expect(color1).toEqual(new Color(RGB, [1, 0.5, 0.5, 1]));
  });
});
