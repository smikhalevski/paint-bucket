import { color, Rgb } from '@paint-bucket/core';
import '../main';

describe('plugin', () => {
  test('creates color by X11 name', () => {
    expect(color('blue').get(Rgb)).toEqual([0, 0, 1, 1]);
    expect(color('DARKORANGE').get(Rgb)).toEqual([1, 0.5490196078431373, 0, 1]);
    expect(color('cyan').get(Rgb)).toEqual([0, 1, 1, 1]);
  });
});
