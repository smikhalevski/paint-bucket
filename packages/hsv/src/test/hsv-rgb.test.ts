import {createRgb} from '@paint-bucket/rgb';
import {createHsv, hsvToRgb, rgbToHsv} from '../main';

describe('rgbToHsv', () => {

  test('converts black RGB to HSV', () => {
    expect(rgbToHsv(createRgb(), createHsv())).toEqual({
      H: 0,
      S: 0,
      V: 0,
      a: 1,
    });
  });

  test('converts RGB to HSV', () => {
    expect(rgbToHsv(createRgb(0.12, 0.34, 0.56), createHsv())).toEqual({
      H: 0.5833333333333334,
      S: 0.7857142857142857,
      V: 0.56,
      a: 1,
    });
  });
});

describe('hsvToRgb', () => {

  test('converts HSV to RGB', () => {
    const hsv = rgbToHsv(createRgb(0.12, 0.34, 0.56), createHsv());

    expect(hsvToRgb(hsv, createRgb())).toEqual({
      R: 0.12000000000000002,
      G: 0.3766666666666667,
      B: 0.56,
      a: 1,
    });
  });
});
