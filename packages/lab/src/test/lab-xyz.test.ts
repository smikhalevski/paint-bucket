import {createLab, labToXyz, xyzToLab} from '../main';
import {createXyz} from '@paint-bucket/xyz';

describe('xyzToLab', () => {

  test('converts XYZ to LAB', () => {
    expect(xyzToLab(createXyz(), createLab())).toEqual({
      L: 0,
      A: 0,
      B: 0,
      a: 1,
    });

    expect(xyzToLab(createXyz(41.25, 21.27, 1.93), createLab())).toEqual({
      L: 54.2947584122476,
      A: 80.8161379805365,
      B: 69.91517622055352,
      a: 1,
    });
  });
});

describe('labToXyz', () => {

  test('converts LAB to XYZ', () => {
    const xyz = createXyz(41.25, 21.27, 1.93);
    const lab = xyzToLab(xyz, createLab());

    expect(labToXyz(lab, createXyz())).toEqual({
      X: 41.24999842546713,
      Y: 21.270001629204344,
      Z: 1.930000866892758,
      a: 1,
    });
  });
});
