import {labToXyz, xyzToLab} from '../main';

describe('xyzToLab', () => {

  test('converts black XYZ to LAB', () => {
    expect(xyzToLab([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([
      0,
      0,
      0,
      1,
    ]);
  });

  test('converts white XYZ to LAB', () => {
    expect(xyzToLab([0.95, 1, 1, 1], [0, 0, 0, 1])).toEqual([
      0.9999999999999999,
      0.0033201940739113756,
      0.04644927767176599,
      1,
    ]);
  });

  test('converts XYZ to LAB', () => {
    expect(xyzToLab([0.25, 0.40, 0.15, 1], [0, 0, 0, 1])).toEqual([
      0.6946953076845696,
      -0.47778359758473665,
      0.43563389174866574,
      1,
    ]);
  });

  test('examples from Matlab', () => {
    // https://www.mathworks.com/help/images/ref/xyz2lab.html
    expect(xyzToLab([0.25, 0.40, 0.10, 1], [0, 0, 0, 1])).toEqual([
      0.6946953076845696,
      -0.47778359758473665,
      0.5668546775906637,
      1,
    ]);
  });
});

describe('labToXyz', () => {

  test('converts LAB to XYZ', () => {
    const lab = xyzToLab([0.25, 0.40, 0.15, 1], [0, 0, 0, 1]);

    expect(labToXyz(lab, [0, 0, 0, 1])).toEqual([
      0.25,
      0.39999999999999997,
      0.15000000000000005,
      1,
    ]);
  });
});
