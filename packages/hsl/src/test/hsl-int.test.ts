import {createHsl, hslToInt, intToHsl} from '../main';

describe('hslToInt', () => {

  test('clamps bytes', () => {
    expect(hslToInt(createHsl(900, 30, 200, 100))).toBe(0xFF_4D_FF_FF_1);
  });
});

describe('intToHsl', () => {

  test('symmetrical to packaging', () => {
    const hsl1 = createHsl();
    const hsl2 = intToHsl(hslToInt(createHsl(25, 30, 70, .2)), hsl1);

    expect(hsl2).toBe(hsl1);
    expect(hsl2).toEqual({
      type: 'hsl',
      H: 25.41176470588235,
      S: 30.19607843137255,
      L: 70.19607843137254,
      a: .2,
    });
  });
});
