import {createRgb} from '@paint-bucket/rgb';
import {createXyz, xyzToRgb, rgbToXyz} from '../main';

describe('rgbToXyz', () => {

  test('converts black RGB to XYZ', () => {
    expect(rgbToXyz(createRgb(), createXyz())).toEqual({
      X: 0,
      Y: 0,
      Z: 0,
      a: 1,
    });
  });

  test('converts RGB to XYZ', () => {
    expect(rgbToXyz(createRgb(0.12, 0.34, 0.56), createXyz())).toEqual({
      X: 0.08879152765920298,
      Y: 0.0902970352964331,
      Z: 0.2718308369694447,
      a: 1,
    });
  });
});

describe('xyzToRgb', () => {

  test('converts XYZ to RGB', () => {
    const xyz = rgbToXyz(createRgb(0.12, 0.34, 0.56), createXyz());

    expect(xyzToRgb(xyz, createRgb())).toEqual({
      R: 0.11999999999997679,
      G: 0.3400000000000021,
      B: 0.5599999999999997,
      a: 1,
    });
  });
});
