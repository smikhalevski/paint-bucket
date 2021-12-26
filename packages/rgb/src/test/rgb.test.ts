import {createRgb} from '@paint-bucket/core/src/main';

describe('rgb', () => {

  test('creates RGB color', () => {
    expect(createRgb(18, 52, 86)).toEqual({
      type: 'rgb',
      R: 18,
      G: 52,
      B: 86,
      a: 1,
    });
  });

  test('creates RGB color with alpha', () => {
    expect(createRgb(18, 52, 86, .5)).toEqual({
      type: 'rgb',
      R: 18,
      G: 52,
      B: 86,
      a: .5,
    });
  });
});
