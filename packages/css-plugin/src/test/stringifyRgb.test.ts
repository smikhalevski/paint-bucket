import {stringifyRgb} from '../main/stringifyRgb';

describe('stringifyRgb', () => {

  test('stringifies black RGB', () => {
    expect(stringifyRgb([0, 0, 0, 1])).toBe('#000000');
  });

  test('stringifies RGB', () => {
    expect(stringifyRgb([0.1, 0.2, 0.35, 1])).toBe('#1a3359');
  });

  test('stringifies RGBa', () => {
    expect(stringifyRgb([0.1, 0.2, 0.35, 0.5])).toBe('rgba(26,51,89,0.50)');
  });
});
