import {hsl} from '../../main/color-spaces/hsl';

describe('hsl', () => {

  test('creates HSL color', () => {
    expect(hsl(25, 30, 70)).toBe(0x11_4C_B2_FF_01);
  });

  test('creates HSL color with alpha', () => {
    expect(hsl(25, 30, 70, .5)).toBe(0x11_4C_B2_7F_01);
  });

  test('clamps bytes', () => {
    expect(hsl(900, 30, 200, 100)).toBe(hsl(360, 30, 100, 1));
  });
});
