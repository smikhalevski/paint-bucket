import {createLab, labToXyz, xyzToLab} from '../main';
import {createXyz} from '@paint-bucket/xyz';

describe('xyzToLab', () => {

  test('converts black XYZ to LAB', () => {
    expect(xyzToLab(createXyz(), createLab())).toEqual({
      L: 0,
      A: 0,
      B: 0,
      a: 1,
    });
  });

  test('converts XYZ to LAB', () => {
    expect(xyzToLab(createXyz(0.25, 0.40, 0.15), createLab())).toEqual({
      L: 0.6946953076845696,
      A: -0.5342288739032036,
      B: 0.4109540302735435,
      a: 1,
    });
  });
});

describe('labToXyz', () => {

  test('converts LAB to XYZ', () => {
    const lab = xyzToLab(createXyz(0.25, 0.40, 0.15), createLab());

    expect(labToXyz(lab, createXyz())).toEqual({
      X: 0.25,
      Y: 0.39999999999999997,
      Z: 0.15000000000000002,
      a: 1,
    });
  });
});
