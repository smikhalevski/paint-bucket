import { describe, test, expect } from 'vitest';
import { Color, RGB } from '../../../main/core.js';
import '../../../main/plugin/x11';

describe('parse', () => {
  test('creates color by X11 name', () => {
    expect(Color.parse('blue').getComponents(RGB)).toStrictEqual([0, 0, 1, 1]);
    expect(Color.parse('DARKORANGE').getComponents(RGB)).toStrictEqual([1, 0.5490196078431373, 0, 1]);
    expect(Color.parse('cyan').getComponents(RGB)).toStrictEqual([0, 1, 1, 1]);
  });
});
