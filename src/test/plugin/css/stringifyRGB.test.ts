import { describe, test, expect } from 'vitest';
import { Color, RGB } from '../../../main/core.js';
import { stringifyRGB } from '../../../main/plugin/css/stringifyRGB.js';

describe('stringifyRGB', () => {
  test('stringifies black RGB', () => {
    expect(stringifyRGB(new Color(RGB, [0, 0, 0, 1]))).toBe('rgb(0,0,0)');
  });

  test('stringifies RGB', () => {
    expect(stringifyRGB(new Color(RGB, [0.1, 0.2, 0.35, 1]))).toBe('rgb(26,51,89)');
  });

  test('stringifies RGBa', () => {
    expect(stringifyRGB(new Color(RGB, [0.1, 0.2, 0.35, 0.5]))).toBe('rgba(26,51,89,0.5)');
  });
});
