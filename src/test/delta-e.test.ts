import {deltaE2000, rgbToLab} from '../main/delta-e';
import {hsl, rgb} from '../main/colors';

describe('rgbToLab', () => {

  test('converts RGB to LAB', () => {
    expect(rgb(0, 0, 0).toString(16)).toBe(0x00_00_00_00_00);
    // expect(rgbToLab(rgb(0, 0, 0).toString(16))).toBe(0x00_00_00_00_00);
  });
});

// describe('deltaE2000', () => {
//
//   //
//   // test('clamps int to byte', () => {
//   //   const blackRgb = rgb(0, 0, 0);
//   //   const whiteRgb = rgb(0xFF, 0xFF, 0xFF);
//   //
//   //   const blackHsl = hsl(0, 0, 0);
//   //   const whiteHsl = hsl(0, 0, 0xFF);
//   //
//   //   expect(deltaE2000(blackRgb, whiteRgb)).toBe(0.7313255232025253);
//   //   expect(deltaE2000(blackRgb, blackRgb)).toBe(0);
//   //
//   //   // expect(deltaE2000(blackRgb, whiteHsl)).toBe(1);
//   //   expect(deltaE2000(blackRgb, blackHsl)).toBe(0);
//   // });
// });
//
