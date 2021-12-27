import {createRgb} from '@paint-bucket/rgb';
import {createHsl, hslToRgb, rgbToHsl} from '../main';

describe('rgbToHsl', () => {

  test('converts black RGB to HSL', () => {
    expect(rgbToHsl(createRgb(), createHsl())).toEqual({
      H: 0,
      S: 0,
      L: 0,
      a: 1,
    });
  });

  test('converts RGB to HSL', () => {
    expect(rgbToHsl(createRgb(0.12, 0.34, 0.56), createHsl())).toEqual({
      H: 0.5833333333333334,
      S: 0.6470588235294118,
      L: 0.34,
      a: 1,
    });
  });
});

describe('hslToRgb', () => {

  test('converts HSL to RGB', () => {
    const hsl = rgbToHsl(createRgb(0.12, 0.34, 0.56), createHsl());

    expect(hslToRgb(hsl, createRgb())).toEqual({
      R: 0.12,
      G: 0.33999999999999986,
      B: 0.56,
      a: 1,
    });
  });
});
