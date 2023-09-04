import { convertLABhToRGB, convertRGBToLABh } from '../../../main/color-model/labh';

describe('convertRGBToLABh', () => {
  test('converts black RGB to LABh', () => {
    expect(convertRGBToLABh([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([0, 0, 0, 1]);
  });

  test('converts white RGB to LABh', () => {
    expect(convertRGBToLABh([1, 1, 1, 1], [0, 0, 0, 1])).toEqual([10, -0.41409338203666074, 1.0710000000000002, 1]);
  });
});

describe('convertLABhToRGB', () => {
  test('converts LABh to RGB', () => {
    const labh = convertRGBToLABh([0.25, 0.4, 0.15, 1], [0, 0, 0, 1]);

    expect(convertLABhToRGB(labh, [0, 0, 0, 1])).toEqual([
      0.24381703043403763, 0.40000000000000097, 0.1555619410421355, 1,
    ]);
  });
});
