import {createHsl} from '../main';

describe('hsl', () => {

  test('creates HSL color', () => {
    expect(createHsl(25, 30, 70)).toEqual({
      type: 'hsl',
      H: 25,
      S: 30,
      L: 70,
      a: 1,
    });
  });

  test('creates HSL color with alpha', () => {
    expect(createHsl(25, 30, 70, .5)).toEqual({
      type: 'hsl',
      H: 25,
      S: 30,
      L: 70,
      a: .5,
    });
  });
});
