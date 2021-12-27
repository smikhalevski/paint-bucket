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

  test('converts white XYZ to LAB', () => {
    expect(xyzToLab(createXyz(0.95, 1, 1), createLab())).toEqual({
      L: 0.9999999999999999,
      A: 0.0033201940739113756,
      B: 0.04644927767176599,
      a: 1,
    });
  });

  test('converts XYZ to LAB', () => {
    expect(xyzToLab(createXyz(0.25, 0.40, 0.15), createLab())).toEqual({
      L: 0.6946953076845696,
      A: -0.47778359758473665,
      B: 0.43563389174866574,
      a: 1,
    });
  });

  test('examples from Matlab', () => {
    // https://www.mathworks.com/help/images/ref/xyz2lab.html
    expect(xyzToLab(createXyz(0.25, 0.40, 0.10), createLab())).toEqual({
      L: 0.6946953076845696,
      A: -0.47778359758473665,
      B: 0.5668546775906637,
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
      Z: 0.15000000000000005,
      a: 1,
    });
  });
});
