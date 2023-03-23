import { stringifyRGB } from '../main/stringifyRGB';

describe('stringifyRGB', () => {
  test('stringifies black RGB', () => {
    expect(stringifyRGB([0, 0, 0, 1])).toBe('#000000');
  });

  test('stringifies RGB', () => {
    expect(stringifyRGB([0.1, 0.2, 0.35, 1])).toBe('#1a3359');
  });

  test('stringifies RGBa', () => {
    expect(stringifyRGB([0.1, 0.2, 0.35, 0.5])).toBe('rgba(26,51,89,0.50)');
  });
});
