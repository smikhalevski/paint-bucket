import {Color, Rgb} from '@paint-bucket/core';
import {Gradient} from '../main';

describe('at', () => {

  test('returns components at value', () => {
    const gradient = new Gradient([new Color(Rgb, [1, 1, 1, 1]), new Color()]);

    expect(gradient.at(0.5)).toEqual([0.5, 0.5, 0.5, 1]);
  });

  test('returns components at out-of-bounds value', () => {
    const gradient = new Gradient([new Color(Rgb, [1, 1, 1, 1]), new Color()]);

    expect(gradient.at(-1)).toEqual([1, 1, 1, 1]);
    expect(gradient.at(2)).toEqual([0, 0, 0, 1]);
  });

  test('supports multiple stops', () => {
    const gradient = new Gradient([new Color(Rgb, [1, 1, 1, 1]), new Color(), new Color(Rgb, [1, 0, 0, 1])]);

    expect(gradient.at(0.25)).toEqual([0.5, 0.5, 0.5, 1]);
    expect(gradient.at(0.5)).toEqual([0, 0, 0, 1]);
    expect(gradient.at(0.75)).toEqual([0.5, 0, 0, 1]);
  });

  test('supports unordered domain', () => {
    const gradient = new Gradient([new Color(), new Color(Rgb, [1, 0, 0, 1]), new Color(Rgb, [1, 1, 1, 1])], [0.5, 1, 0]);

    expect(gradient.at(0.25)).toEqual([0.5, 0.5, 0.5, 1]);
    expect(gradient.at(0.5)).toEqual([0, 0, 0, 1]);
    expect(gradient.at(0.75)).toEqual([0.5, 0, 0, 1]);
  });
});
