import { Color, RGB } from '@paint-bucket/core';
import x11Plugin from '../main';

Color.applyPlugin(x11Plugin);

describe('parse', () => {
  test('creates color by X11 name', () => {
    expect(Color.parse('blue').getComponents(RGB)).toEqual([0, 0, 1, 1]);
    expect(Color.parse('DARKORANGE').getComponents(RGB)).toEqual([1, 0.5490196078431373, 0, 1]);
    expect(Color.parse('cyan').getComponents(RGB)).toEqual([0, 1, 1, 1]);
  });
});