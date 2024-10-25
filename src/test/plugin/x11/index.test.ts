import { Color, RGB } from '../../../main/core';
import '../../../main/plugin/x11';

describe('parse', () => {
  test('creates color by X11 name', () => {
    expect(Color.parse('blue').getComponents(RGB)).toEqual([0, 0, 1, 1]);
    expect(Color.parse('DARKORANGE').getComponents(RGB)).toEqual([1, 0.5490196078431373, 0, 1]);
    expect(Color.parse('cyan').getComponents(RGB)).toEqual([0, 1, 1, 1]);
  });
});
