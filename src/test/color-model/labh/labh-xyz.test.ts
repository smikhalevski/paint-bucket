import { describe, test, expect } from 'vitest';
import { convertLABhToXYZ, convertXYZToLABh } from '../../../main/color-model/labh/index.js';

describe('convertXYZToLABh', () => {
  test('converts black XYZ to LABh', () => {
    expect(convertXYZToLABh([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([0, 0, 0, 1]);
  });

  test('converts white XYZ to LABh', () => {
    expect(convertXYZToLABh([0.95, 1, 1, 1], [0, 0, 0, 1])).toEqual([10, -0.5425000000000004, 1.0710000000000002, 1]);
  });

  test('converts XYZ to LABh', () => {
    expect(convertXYZToLABh([0.25, 0.4, 0.15, 1], [0, 0, 0, 1])).toEqual([
      6.324555320336759, -4.0121397813386315, 3.021002905700357, 1,
    ]);
  });
});

describe('convertLABhToXYZ', () => {
  test('converts LABh to XYZ', () => {
    const lab = convertXYZToLABh([0.25, 0.4, 0.15, 1], [0, 0, 0, 1]);

    expect(convertLABhToXYZ(lab, [0, 0, 0, 1])).toEqual([
      0.25000000000000006, 0.4000000000000001, 0.15000000000000008, 1,
    ]);
  });
});
