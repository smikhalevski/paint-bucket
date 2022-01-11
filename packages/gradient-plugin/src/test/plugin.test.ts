import {Color, color, Rgb} from '@paint-bucket/core';
import '../main';

describe('gradient', () => {

  test('returns a color instance at position', () => {
    const color1 = color.gradient([new Color(), new Color(Rgb, [1, 1, 1, 1])]).at(0.5);

    expect(color1).toEqual([0.5, 0.5, 0.5, 1]);
  });

  test('returns a color instance at position', () => {
    const color1 = color().gradient(new Color(Rgb, [1, 1, 1, 1])).at(0.5);

    expect(color1).toEqual([0.5, 0.5, 0.5, 1]);
  });
});
