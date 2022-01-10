import {Color, color, Rgb} from '@paint-bucket/core';
import '../main';

describe('plugin', () => {

  test('creates color by X11 name', () => {
    expect(color('cyan').get(Rgb)).toEqual([0, 1, 1, 1]);
  });
});
