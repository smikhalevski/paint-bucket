import {createRgb, intToRgb, rgbToInt} from '../main';

describe('rgbToInt', () => {

  test('clamps bytes', () => {
    expect(rgbToInt(createRgb(400, 52, 300, 100))).toBe(0xFF_34_FF_FF_0);
  });
});

describe('intToRgb', () => {

  test('symmetrical to packaging', () => {
    const rgb1 = createRgb();
    const rgb2 = intToRgb(rgbToInt(createRgb(18, 52, 86, .2)), rgb1);

    expect(rgb2).toBe(rgb1);
    expect(rgb2).toEqual({
      type: 'rgb',
      R: 18,
      G: 52,
      B: 86,
      a: 0.2,
    });
  });
});
