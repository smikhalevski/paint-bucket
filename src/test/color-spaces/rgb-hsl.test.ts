import {hsl} from '../../main/color-spaces/hsl';
import {rgb} from '../../main/color-spaces/rgb';
import {hslToRgb, rgbToHsl} from '../../main/color-spaces/rgb-hsl';
import {ColorSpace} from '../../main/color-types';

describe('rgbToHsl', () => {

  const tempHsl = hsl(0, 0, 0);

  test('converts RGB to HSL', () => {
    expect(rgbToHsl(rgb(0, 0, 0), tempHsl)).toEqual({
      colorSpace: ColorSpace.HSL,
      H: 0,
      S: 0,
      L: 0,
      a: 1,
    });

    expect(rgbToHsl(rgb(127, 127, 127), tempHsl)).toEqual({
      colorSpace: ColorSpace.HSL,
      H: 0,
      S: 0,
      L: 49.80392156862745,
      a: 1,
    });

    expect(rgbToHsl(rgb(18, 52, 86), tempHsl)).toEqual({
      colorSpace: ColorSpace.HSL,
      H: 210,
      S: 65.384615384615400,
      L: 20.392156862745097,
      a: 1,
    });
  });
});

describe('hslToRgb', () => {

  const tempRgb = rgb(0, 0, 0);

  test('converts HSL to RGB', () => {
    expect(hslToRgb(hsl(0, 0, 0), tempRgb)).toEqual({
      colorSpace: ColorSpace.RGB,
      R: 0,
      G: 0,
      B: 0,
      a: 1,
    });

    expect(hslToRgb(hsl(0, 0, 50), tempRgb)).toEqual({
      colorSpace: ColorSpace.RGB,
      R: 127.5,
      G: 127.5,
      B: 127.5,
      a: 1,
    });

    expect(hslToRgb(hsl(209, 65.38, 20.4), tempRgb)).toEqual({
      colorSpace: ColorSpace.RGB,
      R: 18.009323999999996,
      G: 53.15368919999996,
      B: 86.030676,
      a: 1,
    });
  });
});
