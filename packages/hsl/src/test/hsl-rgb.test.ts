import {createRgb} from '@paint-bucket/core';
import {createHsl, hslToRgb, rgbToHsl} from '../main';

describe('rgbToHsl', () => {

  test('converts RGB to HSL', () => {
    expect(rgbToHsl(createRgb(0, 0, 0), createHsl())).toEqual({
      type: 'hsl',
      H: 0,
      S: 0,
      L: 0,
      a: 1,
    });

    expect(rgbToHsl(createRgb(127, 127, 127), createHsl())).toEqual({
      type: 'hsl',
      H: 0,
      S: 0,
      L: 49.80392156862745,
      a: 1,
    });

    expect(rgbToHsl(createRgb(18, 52, 86), createHsl())).toEqual({
      type: 'hsl',
      H: 210,
      S: 65.384615384615400,
      L: 20.392156862745097,
      a: 1,
    });
  });
});

describe('hslToRgb', () => {

  test('converts HSL to RGB', () => {
    expect(hslToRgb(createHsl(0, 0, 0), createRgb())).toEqual({
      type: 'rgb',
      R: 0,
      G: 0,
      B: 0,
      a: 1,
    });

    expect(hslToRgb(createHsl(0, 0, 50), createRgb())).toEqual({
      type: 'rgb',
      R: 127.5,
      G: 127.5,
      B: 127.5,
      a: 1,
    });

    expect(hslToRgb(createHsl(209, 65.38, 20.4), createRgb())).toEqual({
      type: 'rgb',
      R: 18.009323999999996,
      G: 53.15368919999996,
      B: 86.030676,
      a: 1,
    });
  });
});
