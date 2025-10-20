import { describe, test, expect } from 'vitest';
import { convertHWBToRGB, convertRGBToHWB } from '../../../main/color-model/hwb/index.js';

describe('convertRGBToHWB', () => {
  test('converts black RGB to HWB', () => {
    expect(convertRGBToHWB([0, 0, 0, 1], [0, 0, 0, 1])).toStrictEqual([0, 0, 1, 1]);
  });

  test('converts RGB to HWB', () => {
    expect(convertRGBToHWB([0.12, 0.34, 0.56, 1], [0, 0, 0, 1])).toStrictEqual([
      0.5833333333333334, 0.12, 0.43999999999999995, 1,
    ]);
  });
});

describe('convertHWBToRGB', () => {
  test('converts HWB to RGB', () => {
    const hwb = convertRGBToHWB([0.12, 0.34, 0.56, 1], [0, 0, 0, 1]);

    expect(convertHWBToRGB(hwb, [0, 0, 0, 1])).toStrictEqual([0.12, 0.34, 0.56, 1]);
  });
});
