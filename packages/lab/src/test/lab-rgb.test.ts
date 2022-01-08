import {labToRgb, rgbToLab} from '../main';

describe('rgbToLab', () => {

  test('converts black RGB to LAB', () => {
    expect(rgbToLab([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([
      0,
      0,
      0,
      1,
    ]);
  });

  test('converts white RGB to LAB', () => {
    expect(rgbToLab([1, 1, 1, 1], [0, 0, 0, 1])).toEqual([
      0.9999999999999999,
      0.011787084034966533,
      0.056074162172674136,
      1,
    ]);
  });
});

describe('labToRgb', () => {

  test('converts LAB to RGB', () => {
    const rgb = rgbToLab([0.25, 0.40, 0.15, 1], [0, 0, 0, 1]);

    expect(labToRgb(rgb, [0, 0, 0, 1])).toEqual([
      0.24381703043403744,
      0.40000000000000097,
      0.15556194104213547,
      1,
    ]);
  });
});
