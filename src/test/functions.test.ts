import {blackHsl, hsl, whiteHsl} from '../main/color-spaces/hsl';
import {blackRgb, rgb, whiteRgb} from '../main/color-spaces/rgb';
import {toGrayscale} from '../main/color-functions';

describe('toGrayscale', () => {

  test('converts color to grayscale', () => {
    expect(toGrayscale(blackRgb)).toBe(blackRgb);
    expect(toGrayscale(whiteRgb)).toBe(whiteRgb);
    expect(toGrayscale(rgb(0x12, 0x34, 0x56))).toBe(rgb(0x32, 0x32, 0x32));
  });

  test('preserves original color model', () => {
    expect(toGrayscale(blackHsl)).toBe(blackHsl);
    expect(toGrayscale(whiteHsl)).toBe(whiteHsl);
    expect(toGrayscale(hsl(0x12, 0x34, 0x56))).toBe(hsl(0, 0, 0x57));
  });

  test('preserves original alpha channel', () => {
    expect(toGrayscale(rgb(0x12, 0x34, 0x56, 0.3))).toBe(rgb(0x32, 0x32, 0x32, 0.3));
  });
});
