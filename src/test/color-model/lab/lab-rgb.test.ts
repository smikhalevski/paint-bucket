import { convertLABToRGB, convertRGBToLAB } from '../../../main/color-model/lab';

describe('convertRGBToLAB', () => {
  test('converts black RGB to LAB', () => {
    expect(convertRGBToLAB([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([0, 0.5, 0.5, 1]);
  });

  test('converts white RGB to LAB', () => {
    expect(convertRGBToLAB([1, 1, 1, 1], [0, 0, 0, 1])).toEqual([
      0.9999999999999999, 0.5058935420174833, 0.5280370810863371, 1,
    ]);
  });
});

describe('convertLABToRGB', () => {
  test('converts LAB to RGB', () => {
    const rgb = convertRGBToLAB([0.25, 0.4, 0.15, 1], [0, 0, 0, 1]);

    expect(convertLABToRGB(rgb, [0, 0, 0, 1])).toEqual([
      0.24381703043403744, 0.40000000000000097, 0.15556194104213536, 1,
    ]);
  });
});
