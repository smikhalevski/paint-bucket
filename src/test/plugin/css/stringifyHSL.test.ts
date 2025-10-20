import { describe, test, expect } from 'vitest';
import { Color, RGB } from '../../../main/core.js';
import { stringifyHSL } from '../../../main/plugin/css/stringifyHSL.js';

describe('stringifyHSL', () => {
  test('stringifies black RGB', () => {
    expect(stringifyHSL(new Color(RGB, [0, 0, 0, 1]))).toBe('hsl(0,0%,0%)');
  });

  test('stringifies RGB', () => {
    expect(stringifyHSL(new Color(RGB, [0.1, 0.2, 0.35, 1]))).toBe('hsl(216,56%,22%)');
  });

  test('stringifies RGBa', () => {
    expect(stringifyHSL(new Color(RGB, [0.1, 0.2, 0.35, 0.5]))).toBe('hsla(216,56%,22%,0.5)');
  });
});
