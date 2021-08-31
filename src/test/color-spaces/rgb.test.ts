import {packRgb, rgb, unpackRgb} from '../../main/color-spaces/rgb';
import {ColorSpace} from '../../main/color-types';

describe('rgb', () => {

  test('creates RGB color', () => {
    expect(rgb(18, 52, 86)).toEqual({
      colorSpace: ColorSpace.RGB,
      R: 18,
      G: 52,
      B: 86,
      a: 1,
    });
  });

  test('creates RGB color with alpha', () => {
    expect(rgb(18, 52, 86, .5)).toEqual({
      colorSpace: ColorSpace.RGB,
      R: 18,
      G: 52,
      B: 86,
      a: .5,
    });
  });
});

describe('packRgb', () => {

  test('clamps bytes', () => {
    expect(packRgb(rgb(400, 52, 300, 100))).toBe(0xFF_34_FF_FF_0);
  });
});

describe('unpackRgb', () => {

  test('symmetrical to packaging', () => {
    const targetColor = rgb(0, 0, 0);
    const unpackedColor = unpackRgb(packRgb(rgb(18, 52, 86, .2)), targetColor);

    expect(unpackedColor).toBe(targetColor);
    expect(unpackedColor).toEqual({
      colorSpace: ColorSpace.RGB,
      R: 18,
      G: 52,
      B: 86,
      a: 0.2,
    });
  });
});
