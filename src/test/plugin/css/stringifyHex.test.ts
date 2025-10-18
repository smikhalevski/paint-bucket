import { describe, test, expect } from 'vitest';
import { Color, RGB } from '../../../main/core.js';
import { stringifyHex } from '../../../main/plugin/css/stringifyHex.js';

describe('stringifyHex', () => {
  test('stringifies black RGB', () => {
    expect(stringifyHex(new Color(RGB, [0, 0, 0, 1]))).toBe('#000000');
  });

  test('stringifies RGB', () => {
    expect(stringifyHex(new Color(RGB, [0.1, 0.2, 0.35, 1]))).toBe('#1a3359');
  });

  test('stringifies RGBa', () => {
    expect(stringifyHex(new Color(RGB, [0.1, 0.2, 0.35, 0.5]))).toBe('#1a335980');
  });
});
