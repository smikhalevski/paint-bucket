import { convertHSVToRGB, convertRGBToHSV } from '../main';

describe('convertRGBToHSV', () => {
  test('converts black RGB to HSV', () => {
    expect(convertRGBToHSV([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([0, 0, 0, 1]);
  });

  test('converts RGB to HSV', () => {
    expect(convertRGBToHSV([0.12, 0.34, 0.56, 1], [0, 0, 0, 1])).toEqual([
      0.5833333333333334, 0.7857142857142857, 0.56, 1,
    ]);
  });
});

describe('convertHSVToRGB', () => {
  test('converts HSV to RGB', () => {
    const hsv = convertRGBToHSV([0.12, 0.34, 0.56, 1], [0, 0, 0, 1]);

    expect(convertHSVToRGB(hsv, [0, 0, 0, 1])).toEqual([0.56, 0.3766666666666667, 0.12000000000000002, 1]);
  });
});
