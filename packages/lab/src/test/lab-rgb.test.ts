import { labToRgb, rgbToLab } from '../main';

describe('rgbToLab', () => {
  test('converts black RGB to LAB', () => {
    expect(rgbToLab([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([0, 0.5, 0.5, 1]);
  });

  test('converts white RGB to LAB', () => {
    expect(rgbToLab([1, 1, 1, 1], [0, 0, 0, 1])).toEqual([
      0.9999999999999999, 0.5058935420174833, 0.5280370810863371, 1,
    ]);
  });
});

describe('labToRgb', () => {
  test('converts LAB to RGB', () => {
    const rgb = rgbToLab([0.25, 0.4, 0.15, 1], [0, 0, 0, 1]);

    expect(labToRgb(rgb, [0, 0, 0, 1])).toEqual([0.24381703043403744, 0.40000000000000097, 0.15556194104213536, 1]);
  });
});
