import {createLab, labToRgb, rgbToLab} from '../main';
import {createRgb} from '@paint-bucket/rgb';

describe('rgbToLab', () => {

  test('converts black RGB to LAB', () => {
    expect(rgbToLab(createRgb(), createLab())).toEqual({
      L: 0,
      A: 0,
      B: 0,
      a: 1,
    });
  });

  test('converts white RGB to LAB', () => {
    expect(rgbToLab(createRgb(1, 1, 1), createLab())).toEqual({
      L: 0.9999999999999999,
      A: 0.011787084034966533,
      B: 0.056074162172674136,
      a: 1,
    });
  });
});

describe('labToRgb', () => {

  test('converts LAB to RGB', () => {
    const rgb = rgbToLab(createRgb(0.25, 0.40, 0.15), createLab());

    expect(labToRgb(rgb, createRgb())).toEqual({
      R: 0.24381703043403744,
      G: 0.40000000000000097,
      B: 0.15556194104213547,
      a: 1,
    });
  });
});
