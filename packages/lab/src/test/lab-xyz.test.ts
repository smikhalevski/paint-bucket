import {labToXyz, xyzToLab} from '../main';

describe('xyzToLab', () => {

  test('converts black XYZ to LAB', () => {
    expect(xyzToLab([0, 0, 0, 1], [0, 0, 0, 1])).toEqual([
      0,
      0.5,
      0.5,
      1,
    ]);
  });

  test('converts white XYZ to LAB', () => {
    expect(xyzToLab([0.95, 1, 1, 1], [0, 0, 0, 1])).toEqual([
      0.9999999999999999,
      0.5016600970369557,
      0.523224638835883,
      1,
    ]);
  });

  test('converts XYZ to LAB', () => {
    expect(xyzToLab([0.25, 0.40, 0.15, 1], [0, 0, 0, 1])).toEqual([
      0.6946953076845696,
      0.2611082012076317,
      0.7178169458743329,
      1,
    ]);
  });

  test('examples from Matlab', () => {
    // https://www.mathworks.com/help/images/ref/xyz2lab.html
    expect(xyzToLab([0.25, 0.40, 0.10, 1], [0, 0, 0, 1])).toEqual([
      0.6946953076845696,
      0.2611082012076317,
      0.7834273387953319,
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
