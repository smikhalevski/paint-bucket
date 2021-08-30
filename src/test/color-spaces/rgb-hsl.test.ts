import {blackHsl, hsl} from '../../main/color-spaces/hsl';
import {blackRgb, rgb} from '../../main/color-spaces/rgb';
import {hslToRgb, rgbToHsl} from '../../main/color-spaces/rgb-hsl';

describe('rgbToHsl', () => {

  test('converts RGB to HSL', () => {
    expect(rgbToHsl(blackRgb)).toBe(hsl(0, 0, 0));
    expect(rgbToHsl(rgb(127, 127, 127))).toBe(hsl(0, 0, 50));
    expect(rgbToHsl(rgb(18, 52, 86))).toBe(hsl(209, 65.38, 20.4));
  });
});

describe('hslToRgb', () => {

  test('converts HSL to RGB', () => {
    expect(hslToRgb(blackHsl)).toBe(blackRgb);
    expect(hslToRgb(hsl(0, 0, 50))).toBe(rgb(127, 127, 127));
    expect(hslToRgb(hsl(209, 65.38, 20.4))).toBe(rgb(18, 53.15, 85));
  });
});
