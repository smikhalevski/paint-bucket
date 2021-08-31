import {ColorSpace} from '../../main/color-types';
import {lab, packLab, unpackLab} from '../../main/color-spaces/lab';

describe('lab', () => {

  test('creates LAB color', () => {
    expect(lab(18, 52, 86)).toEqual({
      colorSpace: ColorSpace.LAB,
      L: 18,
      A: 52,
      B: 86,
      a: 1,
    });
  });

  test('creates LAB color with alpha', () => {
    expect(lab(18, 52, 86, .5)).toEqual({
      colorSpace: ColorSpace.LAB,
      L: 18,
      A: 52,
      B: 86,
      a: .5,
    });
  });
});

describe('packLab', () => {

  test('clamps bytes', () => {
    expect(packLab(lab(400, 52, 300, 100))).toBe(0xFF_B4_FF_FF_4);
  });
});

describe('unpackLab', () => {

  test('symmetrical to packaging', () => {
    const targetColor = lab(0, 0, 0);
    const unpackedColor = unpackLab(packLab(lab(18, 52, 86, .2)), targetColor);

    expect(unpackedColor).toBe(targetColor);
    expect(unpackedColor).toEqual({
      colorSpace: ColorSpace.LAB,
      L: 18.03921568627451,
      A: 52,
      B: 86,
      a: 0.2,
    });
  });
});
