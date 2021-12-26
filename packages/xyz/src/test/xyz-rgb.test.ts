import {createXyz, rgbToXyz, xyzToRgb} from '../main';
import {createRgb} from '@paint-bucket/rgb';

describe('rgbToXyz', () => {

  test('converts RGB to XYZ', () => {
    expect(rgbToXyz(createRgb(), createXyz())).toEqual({
      X: 0,
      Y: 0,
      Z: 0,
      a: 1,
    });

    expect(rgbToXyz(createRgb(127, 127, 127), createXyz())).toEqual({
      X: 20.171896799933698,
      Y: 21.22307786371309,
      Z: 23.108321559514565,
      a: 1,
    });

    expect(rgbToXyz(createRgb(255, 0, 0), createXyz())).toEqual({
      X: 41.24564,
      Y: 21.26729,
      Z: 1.9333900000000002,
      a: 1,
    });
  });
});

describe('xyzToRgb', () => {

  test('converts XYZ to RGB', () => {
    const rgb = createRgb(255, 0, 0);
    const xyz = rgbToXyz(rgb, createXyz());
    expect(xyzToRgb(xyz, createRgb())).toEqual({
      R: 254.99997925881817,
      G: 0.0004342721639882612,
      B: -0.00005629176621817678,
      a: 1,
    });
  });
});
