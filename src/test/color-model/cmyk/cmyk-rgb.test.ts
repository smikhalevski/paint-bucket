import { convertCMYKToRGB, convertRGBToCMYK } from '../../../main/color-model/cmyk';

describe('convertRGBToCMYK', () => {
  test('converts black RGB to CMYK', () => {
    expect(convertRGBToCMYK([0, 0, 0, 1], [0, 0, 0, 0, 0])).toEqual([0, 0, 0, 1, 1]);
  });

  test('converts RGB to CMYK', () => {
    expect(convertRGBToCMYK([0.2, 0.34, 0.56, 1], [0, 0, 0, 0, 0])).toEqual([
      0.642857142857143, 0.3928571428571428, 0, 0.43999999999999995, 1,
    ]);
  });
});

describe('convertCMYKToRGB', () => {
  test('converts CMYK to RGB', () => {
    const cmyk = convertRGBToCMYK([0.2, 0.34, 0.56, 1], [0, 0, 0, 0, 0]);

    expect(convertCMYKToRGB(cmyk, [0, 0, 0, 1])).toEqual([0.19999999999999996, 0.3400000000000001, 0.56, 1]);
  });
});
