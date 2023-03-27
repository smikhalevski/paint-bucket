import { Color, RGB } from '@paint-bucket/core';
import { stringifyColor } from '../main/stringifyColor';

describe('stringifyColor', () => {
  test('stringifies black RGB', () => {
    expect(stringifyColor(new Color(RGB, [0, 0, 0, 1]), RGB)).toBe('#000000');
  });

  test('stringifies RGB', () => {
    expect(stringifyColor(new Color(RGB, [0.1, 0.2, 0.35, 1]), RGB)).toBe('#1a3359');
  });

  test('stringifies RGBa', () => {
    expect(stringifyColor(new Color(RGB, [0.1, 0.2, 0.35, 0.5]), RGB)).toBe('rgba(26,51,89,0.5)');
  });
});
