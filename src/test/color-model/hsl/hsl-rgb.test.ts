import { describe, test, expect } from 'vitest';
import { convertHSLToRGB, convertRGBToHSL } from '../../../main/color-model/hsl/index.js';

describe('convertRGBToHSL', () => {
  test('converts black RGB to HSL', () => {
    expect(convertRGBToHSL([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([0, 0, 0, 1]);
  });

  test('converts RGB to HSL', () => {
    expect(convertRGBToHSL([0.12, 0.34, 0.56, 1], [0, 0, 0, 1])).toEqual([
      0.5833333333333334, 0.6470588235294118, 0.34, 1,
    ]);
  });
});

describe('convertHSLToRGB', () => {
  test('converts HSL to RGB', () => {
    const hsl = convertRGBToHSL([0.12, 0.34, 0.56, 1], [0, 0, 0, 1]);

    expect(convertHSLToRGB(hsl, [0, 0, 0, 1])).toEqual([0.12, 0.33999999999999986, 0.56, 1]);
  });
});
