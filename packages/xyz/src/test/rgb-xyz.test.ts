import {createXyz, rgbToXyz} from '../main';
import {createRgb} from '@paint-bucket/core';

describe('rgbToXyz', () => {

  test('converts RGB to XYZ', () => {
    expect(rgbToXyz(createRgb(), createXyz())).toEqual({
      type: 'xyz',
      X: 0,
      Y: 0,
      Z: 0,
      a: 1,
    });

    expect(rgbToXyz(createRgb(127, 127, 127), createXyz())).toEqual({
      type: 'xyz',
      X: 20.172109030691124,
      Y: 21.223075741405523,
      Z: 23.108109328757162,
      a: 1,
    });

    expect(rgbToXyz(createRgb(255, 0, 0), createXyz())).toEqual({
      type: 'xyz',
      X: 41.246,
      Y: 21.267,
      Z: 1.933,
      a: 1,
    });
  });
});
